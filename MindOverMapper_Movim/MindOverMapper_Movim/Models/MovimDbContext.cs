using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MindOverMapper_Movim.Models
{
    public partial class MovimDbContext : DbContext
    {
        public MovimDbContext()
        {
        }

        public MovimDbContext(DbContextOptions<MovimDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Links> Links { get; set; }
        public virtual DbSet<Permissions> Permissions { get; set; }
        public virtual DbSet<Concept> Concept { get; set; }
        public virtual DbSet<Project> Project { get; set; }
        public virtual DbSet<ProjectParameters> ProjectParameters { get; set; }
        public virtual DbSet<RecoveryGrant> RecoveryGrant { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<IdeationAnswers> IdeationAnswers { get; set; }
        public virtual DbSet<Question> Question { get; set; }
        public virtual DbSet<Prototype> Prototype { get; set; }
        public virtual DbSet<Survey> Survey { get; set; }
        public virtual DbSet<SurveyQuestion> SurveyQuestion { get; set; }
        public virtual DbSet<SurveyPrototype> SurveyPrototype { get; set; }
        public virtual DbSet<SurveyTaker> SurveyTaker { get; set; }
        public virtual DbSet<SurveyAnswer> SurveyAnswer { get; set; }
        public virtual DbSet<ResearchFile> ResearchFile { get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Links>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Href)
                    .IsRequired()
                    .HasColumnName("href")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Uid)
                    .IsRequired()
                    .HasColumnName("uid")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Permissions>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.ProjId })
                    .HasName("PK__Permissi__73BA97CD3F6436C6");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.ProjId).HasColumnName("proj_id");
            });

            modelBuilder.Entity<Concept>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Uid)
                    .IsRequired()
                    .HasColumnName("uid")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ConceptName)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.NewsHeadline)
                    .HasColumnName("headline")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Customer)
                    .HasColumnName("customer")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.CustomerProblem)
                    .HasColumnName("problem")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Promise)
                    .HasColumnName("promise")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Price)
                    .HasColumnName("price")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Passion)
                    .HasColumnName("passion")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.DeathThreats)
                    .HasColumnName("threats")
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.Proof)
                    .HasColumnName("proof")
                    .HasMaxLength(500)
                    .IsUnicode(false);
            });
            modelBuilder.Entity<Project>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("id");

            entity.Property(e => e.DateCreated)
                .HasColumnName("date_created")
                .HasColumnType("datetime");

            entity.Property(e => e.Definition)
                .HasColumnName("definition")
                .HasColumnType("text");

            entity.Property(e => e.Description)
                .IsRequired()
                .HasColumnName("description")
                .HasMaxLength(500)
                .IsUnicode(false);

            entity.Property(e => e.OwnerId).HasColumnName("owner_id");

            entity.Property(e => e.Stimulus)
                .IsRequired()
                .HasColumnName("stimulus")
                .HasColumnType("text");

            entity.Property(e => e.Title)
                .IsRequired()
                .HasColumnName("title")
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.Property(e => e.Uid)
                .IsRequired()
                .HasColumnName("uid")
                .HasMaxLength(50)
                .IsUnicode(false);
        });

            modelBuilder.Entity<ProjectParameters>(entity =>
            {
                entity.ToTable("Project_Parameters");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Content)
                    .IsRequired()
                    .HasColumnName("content")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.LinkId).HasColumnName("link_id");

                entity.Property(e => e.ProjectId).HasColumnName("project_id");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasColumnName("type")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Uid)
                    .IsRequired()
                    .HasColumnName("uid")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<RecoveryGrant>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasColumnName("code")
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.DateSent)
                    .HasColumnName("date_sent")
                    .HasColumnType("datetime");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Uid)
                    .IsRequired()
                    .HasColumnName("uid")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Active).HasColumnName("active");

                entity.Property(e => e.DateCreated)
                    .HasColumnName("date_created")
                    .HasColumnType("datetime");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasColumnName("first_name")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasColumnName("last_name")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LockOut)
                    .HasColumnName("lock_out")
                    .HasColumnType("datetime");

                entity.Property(e => e.LoginAttempts).HasColumnName("login_attempts");

                entity.Property(e => e.PasswordHash)
                    .IsRequired()
                    .HasColumnName("password_hash")
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasColumnName("type")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Uid)
                    .IsRequired()
                    .HasColumnName("uid")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<IdeationAnswers>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Uid)
                .IsRequired()
                .HasColumnName("uid")
                .HasMaxLength(50)
                .IsUnicode(false);

                entity.Property(e => e.Cid)
                .HasColumnName("cid")
                .IsUnicode(false);

                entity.Property(e => e.Qid)
                .IsRequired()
                .HasColumnName("qid")
                .IsUnicode(false);

                entity.Property(e => e.Answer)
                .IsRequired()
                .HasColumnName("answer")
                .HasMaxLength(1000)
                .IsUnicode(false);
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Uid)
                .IsRequired()
                .HasColumnName("uid")
                .HasMaxLength(50)
                .IsUnicode(false);

                entity.Property(e => e.Text)
                .IsRequired()
                .HasColumnName("text")
                .HasMaxLength(1000)
                .IsUnicode(false);

                entity.Property(e => e.Type)
                .HasColumnName("type")
                .HasMaxLength(50)
                .IsUnicode(false);

                entity.Property(e => e.Notes)
                .HasColumnName("notes")
                .HasMaxLength(1000)
                .IsUnicode(false);

                entity.Property(e => e.DateCreated)
                .IsRequired()
                .HasColumnName("date_created")
                .HasColumnType("datetime");

                entity.Property(e => e.Archived)
                .IsRequired()
                .HasColumnName("archived")
                .HasMaxLength(50)
                .IsUnicode(false);

                entity.Property(e => e.Demographic)
                .HasColumnName("demographic")
                .HasDefaultValue(false);
            });

            modelBuilder.Entity<Prototype>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Uid)
                .IsRequired()
                .HasColumnName("uid")
                .HasMaxLength(50)
                .IsUnicode(false);

                entity.Property(e => e.ProjectId).HasColumnName("project_id")
                .IsRequired();

                entity.Property(e => e.PrototypeDescription)
                .HasColumnName("prototype_description")
                .HasMaxLength(1000)
                .IsUnicode(false);

                entity.Property(e => e.PrototypeName)
                .IsRequired()
                .HasColumnName("prototype_name")
                .HasMaxLength(1000)
                .IsUnicode(false);

                entity.Property(e => e.PrototypePath)
                .IsRequired()
                .HasColumnName("prototype_path")
                .HasMaxLength(1000)
                .IsUnicode(false);

            });

            modelBuilder.Entity<Survey>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Uid)
                    .IsRequired()
                    .HasColumnName("uid")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SurveyName)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ProjectId).HasColumnName("project_id");

                entity.Property(e => e.Prototypes)
                    .HasColumnName("prototypes")
                    .HasColumnType("nvarchar(4000)")
                    .IsUnicode(false);

                entity.Property(e => e.ConceptId).HasColumnName("concept_id");

                entity.Property(e => e.Notes)
                    .HasColumnName("notes")
                    .HasMaxLength(2000)
                    .IsUnicode(false);

                entity.Property(e => e.Qualifications)
                    .HasColumnName("qualifications")
                    .HasColumnType("nvarchar(4000)")
                    .IsUnicode(false);

                entity.Property(e => e.Questions)
                    .HasColumnName("questions")
                    .HasColumnType("nvarchar(max)")
                    .IsUnicode(false);

                entity.Property(e => e.DateCreated)
                    .IsRequired()
                    .HasColumnName("date_created")
                    .HasColumnType("datetime");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnName("status")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.EndDate)
                    .HasColumnName("end_date")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Reward)
                    .HasColumnName("reward")
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<SurveyQuestion>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id")
                    .IsRequired();

                entity.Property(e => e.QuestionId).HasColumnName("question_id")
                    .IsRequired();

                entity.Property(e => e.SurveyId).HasColumnName("survey_id")
                    .IsRequired();
            });

            modelBuilder.Entity<SurveyPrototype>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id")
                    .IsRequired();

                entity.Property(e => e.PrototypeId).HasColumnName("prototype_id")
                    .IsRequired();

                entity.Property(e => e.SurveyId).HasColumnName("survey_id")
                    .IsRequired();
            });

            modelBuilder.Entity<SurveyTaker>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id")
                    .IsRequired();

                entity.Property(e => e.Uid)
                    .IsRequired()
                    .HasColumnName("uid")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SurveyUid)
                    .IsRequired()
                    .HasColumnName("survey_uid")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Turk)
                    .HasColumnName("turk")
                    .HasDefaultValue(false);

                entity.Property(e => e.Notes)
                    .HasColumnName("notes")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<SurveyAnswer>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id")
                    .IsRequired();

                entity.Property(e => e.Uid)
                    .IsRequired()
                    .HasColumnName("uid")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SurveyTakerUid)
                    .IsRequired()
                    .HasColumnName("survey_taker_uid")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SurveyUid)
                    .IsRequired()
                    .HasColumnName("survey_uid")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Answer)
                    .IsRequired()
                    .HasColumnName("answer")
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.DateCompleted)
                    .IsRequired()
                    .HasColumnName("date_completed")
                    .HasColumnType("datetime");

                entity.Property(e => e.Qid).HasColumnName("qid")
                    .IsRequired();
            });
        }
    }
}
