# README Previewer

A tool to preview README files in Markdown.

## Run locally

Install Node.js 24 or higher. Then run:

```bash
npm install
```

To start the App run:

```bash
npm run dev
```

or run and expose on all network interfaces:

```bash
npm run dev:host
```

You can specify the documents root directory by setting the `MARKDOWN_ROOT` environment variable. By default, it uses the current working directory. You can also set the maximum width of the markdown content by setting the `MDPREVIEW_WIDTH` environment variable (default is `900px`).

Example:

```bash
MARKDOWN_ROOT=/path/to/markdown/files MDPREVIEW_WIDTH=1200px npm run dev
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

You can add the `-e MDPREVIEW_WIDTH=1200px` option to set the maximum width of the markdown content. The MARKDOWN_ROOT is set to `/docs` inside the container, and should not be changed, unless you mount the files to a different location than `/docs`.