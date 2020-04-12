﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MindOverMapper_Movim.Helpers;
using Microsoft.Azure;
using Microsoft.Azure.Storage;
using Microsoft.Azure.Storage.File;
using System.Threading;

namespace MindOverMapper_Movim
{
    public class AzureFileService
    {
        private AppSettings _appSettings;
        private string Credentials;
        private CloudStorageAccount storageAccount;
        public AzureFileService(IOptions<AppSettings> appSettings)
        {
            this._appSettings = appSettings.Value;
            this.Credentials = this._appSettings.AzureFileStoreConnectionString;
            this.storageAccount = CloudStorageAccount.Parse(this.Credentials);
        }

        public void storeFile(String path, String fileName)
        {
            CloudFileClient fileClient = this.storageAccount.CreateCloudFileClient();
            CloudFileShare fileShare = fileClient.GetShareReference("files");

            if(fileShare.Exists())
            {
                CloudFileDirectory root = fileShare.GetRootDirectoryReference();
                CloudFileDirectory folder = root.GetDirectoryReference("files");
                if (folder.Exists()) {
                    CloudFile file = folder.GetFileReference(fileName);
                    using(AutoResetEvent waitHandle = new AutoResetEvent(false))
                    {
                        ICancellableAsyncResult result = file.BeginUploadFromFile(path, ar => waitHandle.Set() , new object());
                        waitHandle.WaitOne();
                        file.EndUploadFromFile(result);
                    }
                }

            }


        }

    }
}
