Daddy John - Waitlist Landing Page
This is the official pre-launch waitlist landing page for the Daddy John project.

🚀 Setup and Installation
Clone the repository:

git clone <your-repo-url>
cd daddy-john-waitlist

Set up Supabase:

Go to Supabase and create a new project.

In the SQL Editor, run the contents of supabase/migrations/0001_create_waitlist_table.sql to create your waitlist table and set the necessary policy.

Go to Settings > API to find your Project URL and anon public key.

Configure Frontend:

Open public/js/main.js.

Replace the placeholder YOUR_SUPABASE_URL and YOUR_SUPABASE_ANON_KEY values with your actual credentials from the Supabase dashboard.

Run Locally:

You can open the public/index.html file directly in your browser to see the page. For best results, use a local server extension like "Live Server" in VS Code.

✨ Deployment
Deploy the contents of the public folder to any static hosting service like Vercel, Netlify, or GitHub Pages.