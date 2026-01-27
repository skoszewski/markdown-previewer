# README Previewer

A tool to preview README files in Markdown.

## Usage

Install Node.js 24 or higher. Then run:

```bash
npm install
npm run dev
```

or run:

```bash
npm run install
npm run dev:host
```

to expose the previewer on all network interfaces.

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
