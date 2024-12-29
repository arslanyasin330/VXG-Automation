# 🌟 VXG Frontend Automation 🌟

## Overview

Welcome to the **VXG Frontend Automation**! This project leverages the power of [Playwright](https://playwright.dev/) with [Typescript](https://www.typescriptlang.org/docs/) to automate the testing of end to end flows. 🚀

## ⭐ Features

✨ **Automated E2E Testing**: Ensure your Flows are working flawlessly with automated tests.
<br>
✨ **Automated UI Testing**: Ensure your UI functions flawlessly with automated tests.
<br>
✨ **Scalable & Maintainable**: Easily add new tests and maintain existing ones.
<br>

## 📦 Installation

Get started quickly by cloning the repository and installing the necessary dependencies:

```bash
git clone https://github.com/your-username/git-repository-name.git
```

```bash
cd project-directory
```

```bash
npm install
```

```bash
npx playwright install
```

## 🏃‍♂️ Running Test

### Run this command to execute all smoke tests in headless mode

```bash
npm run smoke
```

### Run this command to execute all smoke tests in headed mode

```bash
npm run smoke:headed
```

### Run this command to execute all tests in headless mode

```bash
npm run test
```

### Run this command to execute all tests in headed mode

```bash
npm run headed:test
```

### Run this command to execute specific test

```bash
npx playwright test <path/to/testcase>
```

### Run this command to execute specific test in headed mode

```bash
npx playwright test <path/to/testcase> --headed
```

### Run this command to execute multiple tests

```bash
npx playwright test <path/to/testcase> <path/to/testcase>
```

## 🏃‍♂️ Running Test To Generate HTML Report

### Run this command to generate an HTML report

#### This command will generate index.html file in playwright-report folder after execution of all tests.

```bash
npm run html:test
```

```bash
npm run show:html:report
```

## ALLURE REPORT

### Run this command to run all tests with Allure reporter

#### This command will generate a directory name allure-results in root after execution of all tests.

```bash
npm run tests:allure
```

### Run this command to generate allure-report folder in root of project and then serve the allure report

```bash
npm run serve:allure
```

### Happy Testing 🚀
