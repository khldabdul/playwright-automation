# playwright-automation

## Overview

Playwright Automation Test.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Reporting](#reporting)

## Installation

Make sure you have Node.js version 16+

```bash
npm install
```

If this is the first time you use Playwright:
```bash
npx playwright install
```
to install specific browsers, provide an argument:

- chromium for chrome browser
- webkit for safari browser
- firefox for firefox browser

example:
```bash
npx playwright install firefox
```

## Usage

To run all test headless with all available browsers:
```bash
npm run test
```
and to specify which test:
```bash
npm run test path/to/test
```

To run the test headless:
```bash
npm run test:headless path/to/test
```

To open the test browser:
```bash
npm run test:open
```

To run the codegen on specific URL:
```bash
npm run codegen URL
```
example:
```bash
npm run codegen https://www.saucedemo.com/
```

## Reporting

```bash
npm run report
```