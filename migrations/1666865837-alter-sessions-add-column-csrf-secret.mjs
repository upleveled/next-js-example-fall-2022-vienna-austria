export async function up(sql) {
  await sql`
    ALTER TABLE sessions
    ADD csrf_secret varchar;
  `;
}

export async function down(sql) {
  await sql`
    ALTER TABLE sessions
    DROP COLUMN csrf_secret;
  `;
}
