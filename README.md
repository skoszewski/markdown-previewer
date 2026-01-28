# Markdown Previewer :mag:

A tool to preview README.md and other files in Markdown. It is designed to run locally natively or as a Docker container.

It uses `remark-gfm` to support GitHub Flavored Markdown, `remark-emoji` to support emojis, and `rehype-highlight` for syntax highlighting of code blocks. Some features may not work in other Markdown viewers.

It will render files from a specified directory (default is the current working directory), and follow links to other Markdown files within that directory. It expects `README.md` or `index.md` as the main directory entry point, but you can specify a different file by navigating to it in the browser.

> :warning: **Warning:** It is not designed to be deployed to a public server (yet).

## Run locally

Install Node.js 24 and required dependencies:

```bash
scripts/install-node.sh
npm install
```

> **Note:** You can add a major version number as an argument to `install-node.sh` to install a specific Node.js version (e.g., `scripts/install-node.sh 25`).

To start the App run:

```bash
npm run dev
```

or run and expose on all network interfaces:

```bash
npm run dev:host
```

You can specify the documents root directory by setting the `MDPREVIEW_ROOT` environment variable. By default, it uses the current working directory. You can also set the maximum width of the markdown content by setting the `MDPREVIEW_WIDTH` environment variable (default is `900px`).

Example:

```bash
MDPREVIEW_ROOT=/path/to/markdown/files MDPREVIEW_WIDTH=1200px npm run dev
```

## Docker

Build the Docker image:

```bash
docker build -t readme-previewer .
```

Run the Docker container:

```bash
docker run --rm --name mdpreview -p 3000:3000 -p 5173:5173 -v $(pwd):/docs readme-previewer
```

If you are using `container` use the following command:

```bash
container run --rm --name mdpreview -p 3000:3000 -p 5173:5173 --mount type=bind,source=$(pwd),target=/docs readme-previewer
```

You can add the `-e MDPREVIEW_WIDTH=1200px` option to set the maximum width of the markdown content. The MDPREVIEW_ROOT is set to `/docs` inside the container, and should not be changed, unless you mount the files to a different location than `/docs`.