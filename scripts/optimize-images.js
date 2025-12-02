const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');
const supportedExtensions = ['.png', '.jpg', '.jpeg'];

if (!fs.existsSync(imagesDir)) {
    console.error(`Directory not found: ${imagesDir}`);
    process.exit(1);
}

fs.readdir(imagesDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        if (supportedExtensions.includes(ext)) {
            const inputPath = path.join(imagesDir, file);
            const outputPath = path.join(imagesDir, file.replace(ext, '.webp'));

            // Skip if WebP already exists
            if (fs.existsSync(outputPath)) {
                console.log(`Skipping ${file}, WebP version already exists.`);
                return;
            }

            const command = `ffmpeg -i "${inputPath}" -c:v libwebp -quality 80 "${outputPath}" -y`;

            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error optimizing ${file}:`, error);
                    return;
                }
                console.log(`Optimized: ${file} -> ${path.basename(outputPath)}`);
            });
        }
    });
});
