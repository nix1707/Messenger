using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedMessage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChatGroups_AspNetUsers_CreatedByUserId",
                table: "ChatGroups");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatGroupUsers_AspNetUsers_UserId",
                table: "ChatGroupUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatGroupUsers_ChatGroups_GroupId",
                table: "ChatGroupUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Messages_ChatGroups_GroupId",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Messages_GroupId",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_ChatGroups_CreatedByUserId",
                table: "ChatGroups");

            migrationBuilder.DropColumn(
                name: "GroupId",
                table: "Messages");

            migrationBuilder.RenameColumn(
                name: "SentAt",
                table: "Messages",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "Content",
                table: "Messages",
                newName: "ChatGroupId");

            migrationBuilder.RenameColumn(
                name: "GroupId",
                table: "ChatGroupUsers",
                newName: "ChatGroupId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "ChatGroupUsers",
                newName: "AppUserId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatGroupUsers_GroupId",
                table: "ChatGroupUsers",
                newName: "IX_ChatGroupUsers_ChatGroupId");

            migrationBuilder.RenameColumn(
                name: "GroupName",
                table: "ChatGroups",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "CreatedByUserId",
                table: "ChatGroups",
                newName: "Description");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Messages",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "TEXT")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<string>(
                name: "Body",
                table: "Messages",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsAdmin",
                table: "ChatGroupUsers",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ChatGroupId",
                table: "Messages",
                column: "ChatGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatGroupUsers_AspNetUsers_AppUserId",
                table: "ChatGroupUsers",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatGroupUsers_ChatGroups_ChatGroupId",
                table: "ChatGroupUsers",
                column: "ChatGroupId",
                principalTable: "ChatGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_ChatGroups_ChatGroupId",
                table: "Messages",
                column: "ChatGroupId",
                principalTable: "ChatGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChatGroupUsers_AspNetUsers_AppUserId",
                table: "ChatGroupUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatGroupUsers_ChatGroups_ChatGroupId",
                table: "ChatGroupUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Messages_ChatGroups_ChatGroupId",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Messages_ChatGroupId",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "Body",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "IsAdmin",
                table: "ChatGroupUsers");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Messages",
                newName: "SentAt");

            migrationBuilder.RenameColumn(
                name: "ChatGroupId",
                table: "Messages",
                newName: "Content");

            migrationBuilder.RenameColumn(
                name: "ChatGroupId",
                table: "ChatGroupUsers",
                newName: "GroupId");

            migrationBuilder.RenameColumn(
                name: "AppUserId",
                table: "ChatGroupUsers",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatGroupUsers_ChatGroupId",
                table: "ChatGroupUsers",
                newName: "IX_ChatGroupUsers_GroupId");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "ChatGroups",
                newName: "GroupName");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "ChatGroups",
                newName: "CreatedByUserId");

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "Messages",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<Guid>(
                name: "GroupId",
                table: "Messages",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Messages_GroupId",
                table: "Messages",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_ChatGroups_CreatedByUserId",
                table: "ChatGroups",
                column: "CreatedByUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatGroups_AspNetUsers_CreatedByUserId",
                table: "ChatGroups",
                column: "CreatedByUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatGroupUsers_AspNetUsers_UserId",
                table: "ChatGroupUsers",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatGroupUsers_ChatGroups_GroupId",
                table: "ChatGroupUsers",
                column: "GroupId",
                principalTable: "ChatGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_ChatGroups_GroupId",
                table: "Messages",
                column: "GroupId",
                principalTable: "ChatGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
