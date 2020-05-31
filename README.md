# BloodConnect Docs

This repository contains the relevant source code for [BloodConnect's developer's documentation site](http://bloodwork-nus.github.io/bloodconnect). This site mainly contains development stories, project objectives, users' guides, and developers' guides.

> BloodConnect Docs is proudly powered by [Docusaurus](https://docusaurus.io/), and hence, is maintainable with Markdown and React. Kudos for the teams at Facebook Open Source for creating such an amazing library!

## Contributing
Document writing is in Markdown.
### Adding pages to `Docs`
To add pages to the **Docs** section, add .md files to the `docs` directory and always remember to start each file with the following header lines.
```markdown
---
id: <your-page-id>
title: <title-of-the-page>
sidebar_label: <label-of-page-on-the-sidebar>
---
```

For example, the header for `about.md` is:
```markdown
---
id: about
title: Bloodwork
sidebar_label: Who We Are
---
```
> Try to keep things simple: **use the filename as the `id`**.

Then, add a new line and start typing your page content in the following line. To navigate to other .md files, just use the filename as the URL. For example, `[This is a link to doc1.md](doc1.md)` for a file in `docs`.

### Adding pages to `Blog`
To add pages to the **Blog** section, add .md files to the `blog` directory and name the file with the convention `<yyyy>-<mm>-<dd>-<post-id>.md`. Always remember to start each file with the following header lines.
```markdown
---
id: <post-id>
title: <post-title>
author: <your-name>
author_title: <your-title>
author_url: <your-github-url>
author_image_url: <your-profile-picture-url>
tags: [any, tags, you, want]
---
```
For example,
```markdown
---
id: welcome
title: BloodConnect Docs is live!
author: Phillmont Muktar
author_title: Full Stack Software Engineer at Bloodwork
author_url: https://github.com/purfectliterature
author_image_url: https://avatars1.githubusercontent.com/u/51525686?s=460&v=4
tags: [blood, welcome, docs, bloodwork, bloodconnect]
---
```

## Publishing
It is recommended to create/edit markdown files in GitHub, since it has a built-in *Edit file* and *Preview changes* functions specifically made for Markdown files. *Edit file* has syntax highlighting enough for basic Markdown and *Preview changes* can instantly show how the document will be rendered (not 100% reflective on site). You can read more about this function [here](https://help.github.com/en/enterprise/2.14/user/articles/editing-files-in-your-repository).

However, if you want to edit the page components (in JavaScript) or a more reflective editing experience, you can locally maintain `bloodconnect-docs`. Follow these instructions.

### Pre-requisites
Since BloodConnect Docs is written with React, you will have to install [Node.js](http://nodejs.org). It is **highly recommended** that you install [Yarn](https://yarnpkg.com/). BloodConnect Docs uses Yarn, and while technically it will work fine with `npm`, I don't want to waste unnecessary time debugging if things break down just because of `yarn` vs `npm` problems :)

> `npm` stands for `n`ode `p`ackage `m`anager. It is used to manage installed modules for supporting a Node project, like this one.
> Long story short, `yarn` is an extension for `npm` and can be used in place of `npm`. It is gazillion times better and faster than `npm`. This guide presupposes you use `yarn` like literally everybody else :)

### Local development
Clone this repository onto your computer.
```
$ git clone https://github.com/bloodwork-nus/bloodconnect-docs.git
```
Then, navigate to the cloned folder by invoking `cd bloodconnect-docs`. Now, you will need to get all the dependencies.
```
$ yarn install
```
Next, you can start the development environment.
```
$ yarn start
```
After a while, you should be able to see a new browser window opening, usually navigating to `localhost:3000`. This is where your site will live and **live refresh** as you edit any files in the project directory. You can now open the project directory with your favourite code editor and start adding files or making changes.

### Deploying to GitHub Pages
To deploy your changes, save all your changes and simply invoke this command:
| Platform | Command |
| ------- | --------------------------------------------------------------- |
| Linux   | `$ GIT_USER=<Your GitHub username> yarn deploy`                 |
| Windows | `$ cmd /C "set "GIT_USER=<Your GitHub username>" && yarn deploy"` |

If there are no errors, the site should be live at [https://bloodwork-nus.github.io/bloodconnect](https://bloodwork-nus.github.io/bloodconnect/). Congratulations!

### Merging with this repository
If you are one of the contributors, please feel free to directly `push` into this repository **if you know what you are doing**. If you want to play safe, push to GitHub by invoking `git push origin master:<new branch name>` to push to a temporary branch. Then, create a **pull request** to merge into the branch and check if there are no conflicting files.

If you are not one of the contributors, make a fork and create a pull request. Then, wait for my approval :)
