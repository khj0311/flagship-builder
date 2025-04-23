# Project B Images Directory

This directory stores images and video media files for Project B.

## Structure

- `/images`: Store image files (.jpg, .png, .svg, .gif, etc.)
- `/videos`: Store video files (.mp4, .webm, etc.)

When referencing these media files in your components, use relative paths like:

```html
<!-- In a component HTML -->
<img src="../../images/logo.png" alt="Logo">
<video src="../../images/videos/intro.mp4" controls></video>
```

These files will be properly copied to the dist folder during build process.