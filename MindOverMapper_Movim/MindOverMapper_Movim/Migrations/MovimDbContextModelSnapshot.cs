﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MindOverMapper_Movim.Models;

namespace MindOverMapper_Movim.Migrations
{
    [DbContext(typeof(MovimDbContext))]
    partial class MovimDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("MindOverMapper_Movim.Models.Concept", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ConceptName")
                        .IsRequired()
                        .HasColumnName("name")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.Property<string>("Customer")
                        .HasColumnName("customer")
                        .HasMaxLength(500)
                        .IsUnicode(false);

                    b.Property<string>("CustomerProblem")
                        .HasColumnName("problem")
                        .HasMaxLength(500)
                        .IsUnicode(false);

                    b.Property<string>("DeathThreats")
                        .HasColumnName("threats")
                        .HasMaxLength(1000)
                        .IsUnicode(false);

                    b.Property<string>("NewsHeadline")
                        .HasColumnName("headline")
                        .HasMaxLength(500)
                        .IsUnicode(false);

                    b.Property<string>("Passion")
                        .HasColumnName("passion")
                        .HasMaxLength(500)
                        .IsUnicode(false);

                    b.Property<string>("Price")
                        .HasColumnName("price")
                        .HasMaxLength(500)
                        .IsUnicode(false);

                    b.Property<int>("ProjectId");

                    b.Property<string>("Promise")
                        .HasColumnName("promise")
                        .HasMaxLength(500)
                        .IsUnicode(false);

                    b.Property<string>("Proof")
                        .HasColumnName("proof")
                        .HasMaxLength(500)
                        .IsUnicode(false);

                    b.Property<string>("Uid")
                        .IsRequired()
                        .HasColumnName("uid")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.HasKey("Id");

                    b.ToTable("Concept");
                });

            modelBuilder.Entity("MindOverMapper_Movim.Models.IdeationAnswers", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Answer")
                        .IsRequired()
                        .HasColumnName("answer")
                        .HasMaxLength(1000)
                        .IsUnicode(false);

                    b.Property<int>("Cid")
                        .HasColumnName("cid")
                        .IsUnicode(false);

                    b.Property<int>("Qid")
                        .HasColumnName("qid")
                        .IsUnicode(false);

                    b.Property<string>("Uid")
                        .IsRequired()
                        .HasColumnName("uid")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.HasKey("Id");

                    b.ToTable("IdeationAnswers");
                });

            modelBuilder.Entity("MindOverMapper_Movim.Models.Links", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Href")
                        .IsRequired()
                        .HasColumnName("href")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnName("name")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.Property<string>("Uid")
                        .IsRequired()
                        .HasColumnName("uid")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.HasKey("Id");

                    b.ToTable("Links");
                });

            modelBuilder.Entity("MindOverMapper_Movim.Models.Permissions", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnName("user_id");

                    b.Property<int>("ProjId")
                        .HasColumnName("proj_id");

                    b.HasKey("UserId", "ProjId")
                        .HasName("PK__Permissi__73BA97CD3F6436C6");

                    b.ToTable("Permissions");
                });

            modelBuilder.Entity("MindOverMapper_Movim.Models.Project", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateCreated")
                        .HasColumnName("date_created")
                        .HasColumnType("datetime");

                    b.Property<string>("Definition")
                        .HasColumnName("definition")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnName("description")
                        .HasMaxLength(500)
                        .IsUnicode(false);

                    b.Property<int>("OwnerId")
                        .HasColumnName("owner_id");

                    b.Property<string>("Stimulus")
                        .IsRequired()
                        .HasColumnName("stimulus")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnName("title")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.Property<string>("Uid")
                        .IsRequired()
                        .HasColumnName("uid")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.HasKey("Id");

                    b.ToTable("Project");
                });

            modelBuilder.Entity("MindOverMapper_Movim.Models.ProjectParameters", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnName("content")
                        .HasMaxLength(500)
                        .IsUnicode(false);

                    b.Property<int?>("LinkId")
                        .HasColumnName("link_id");

                    b.Property<int>("ProjectId")
                        .HasColumnName("project_id");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnName("type")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.Property<string>("Uid")
                        .IsRequired()
                        .HasColumnName("uid")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.HasKey("Id");

                    b.ToTable("Project_Parameters");
                });

            modelBuilder.Entity("MindOverMapper_Movim.Models.Prototype", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ProjectId");

                    b.Property<string>("PrototypeDescription")
                        .IsRequired()
                        .HasColumnName("description")
                        .HasMaxLength(500)
                        .IsUnicode(false);

                    b.Property<string>("PrototypeName")
                        .IsRequired()
                        .HasColumnName("name")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.Property<string>("Uid")
                        .IsRequired()
                        .HasColumnName("uid")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.HasKey("Id");

                    b.ToTable("Prototype");
                });

            modelBuilder.Entity("MindOverMapper_Movim.Models.Question", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Archived")
                        .IsRequired()
                        .HasColumnName("archived")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.Property<DateTime>("DateCreated")
                        .HasColumnName("date_created")
                        .HasColumnType("datetime");

                    b.Property<string>("Notes")
                        .HasColumnName("notes")
                        .HasMaxLength(1000)
                        .IsUnicode(false);

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnName("text")
                        .HasMaxLength(1000)
                        .IsUnicode(false);

                    b.Property<string>("Type")
                        .HasColumnName("type")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.Property<string>("Uid")
                        .IsRequired()
                        .HasColumnName("uid")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.HasKey("Id");

                    b.ToTable("Question");
                });

            modelBuilder.Entity("MindOverMapper_Movim.Models.RecoveryGrant", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnName("code")
                        .HasMaxLength(6)
                        .IsUnicode(false);

                    b.Property<DateTime>("DateSent")
                        .HasColumnName("date_sent")
                        .HasColumnType("datetime");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnName("email")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.Property<string>("Uid")
                        .IsRequired()
                        .HasColumnName("uid")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.HasKey("Id");

                    b.ToTable("RecoveryGrant");
                });

            modelBuilder.Entity("MindOverMapper_Movim.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<byte>("Active")
                        .HasColumnName("active");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnName("date_created")
                        .HasColumnType("datetime");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnName("email")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnName("first_name")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnName("last_name")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.Property<DateTime?>("LockOut")
                        .HasColumnName("lock_out")
                        .HasColumnType("datetime");

                    b.Property<int>("LoginAttempts")
                        .HasColumnName("login_attempts");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnName("password_hash")
                        .HasMaxLength(300)
                        .IsUnicode(false);

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnName("type")
                        .HasMaxLength(20)
                        .IsUnicode(false);

                    b.Property<string>("Uid")
                        .IsRequired()
                        .HasColumnName("uid")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.HasKey("Id");

                    b.ToTable("User");
                });
#pragma warning restore 612, 618
        }
    }
}
