using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddedMedia : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MediaId",
                table: "Messages",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Media",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    MediaType = table.Column<int>(type: "INTEGER", nullable: false),
                    Url = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Media", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Messages_MediaId",
                table: "Messages",
                column: "MediaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Media_MediaId",
                table: "Messages",
                column: "MediaId",
                principalTable: "Media",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Media_MediaId",
                table: "Messages");

            migrationBuilder.DropTable(
                name: "Media");

            migrationBuilder.DropIndex(
                name: "IX_Messages_MediaId",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "MediaId",
                table: "Messages");
        }
    }
}
