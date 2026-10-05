# The Other Side — easy-update portfolio

The current visual design is preserved. Portfolio entries are managed through `works.csv`; you do not need to edit HTML, CSS, or JavaScript to add work.

## Add a work (browser-only workflow)
1. Open your GitHub repository: https://github.com/rashedsawpno37/the-other-side
2. Upload your image into a folder such as `images/portraits/` or `images/landscapes/`. If the folder does not exist, create it by using **Add file → Create new file** and naming a temporary file such as `images/portraits/.gitkeep`; commit it, then upload the image into that folder.
3. Open `works.csv` and click the pencil icon to edit it.
4. Add one new line at the bottom with these columns in this exact order:
   `category,title,description,image,label`
5. Use one category exactly: `writing`, `calligraphy`, `portraits`, or `landscapes`.
6. For `image`, enter the path to your uploaded file, e.g. `images/portraits/my-drawing.jpg`. Use forward slashes. You can leave the image blank for a text-only writing entry or a placeholder card.
7. Click **Commit changes**. After GitHub Pages rebuilds, refresh the website.

## CSV example
`portraits,Study in Graphite,A pencil portrait drawn in 2026.,images/portraits/study-in-graphite.jpg,Portrait`

Important CSV tips:
- Keep the header row at the top; do not delete it.
- If a title or description contains a comma, wrap that field in double quotes. Example: `writing,"Rain, Then Silence",A short poem.,images/writing/rain.jpg,Poem`
- Avoid double quotes inside descriptions where possible.
- Image files should be JPG, PNG, or WebP, and ideally compressed for the web.
- The existing rows are demonstration entries. Replace them with your own entries when ready; you can delete sample rows from `works.csv` without touching code.
- The four category cards and overall layout remain in `index.html` and `styles.css`; adding an entry only changes `works.csv` and your image files.
