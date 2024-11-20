using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class DataContext(DbContextOptions<DataContext> options) 
    : IdentityDbContext<AppUser>(options)
{
    public DbSet<ChatGroup> ChatGroups { get; set; }
    public DbSet<ChatGroupUser> ChatGroupUsers { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<Media> Media { get; set; } 

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ChatGroupUser>()
            .HasKey(cg => new { cg.AppUserId, cg.ChatGroupId });

        builder.Entity<ChatGroupUser>()
            .HasOne(cg => cg.AppUser)
            .WithMany(u => u.ChatGroups)
            .HasForeignKey(cg => cg.AppUserId);

        builder.Entity<ChatGroupUser>()
            .HasOne(cg => cg.ChatGroup)
            .WithMany(g => g.Members)
            .HasForeignKey(cg => cg.ChatGroupId);

        builder.Entity<Message>()
            .HasOne(m => m.ChatGroup)
            .WithMany(g => g.Messages)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
