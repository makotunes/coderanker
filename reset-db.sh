npm run db:reset
rm -rf drizzle
npm run db:generate
npm run db:migrate
npm run db:seed