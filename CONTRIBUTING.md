# Contributing to Shuemo

## How to Contribute

Shuemo is a collaborative project, and we welcome contributions from everyone. This guide will help you understand how to contribute.

### Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it to understand what actions will and will not be tolerated.

### Reporting Bugs

If you find a bug, please open an issue on [GitHub](https://github.com/your-repo/shuemo/issues) with:

- A clear and descriptive title
- A detailed description of the issue
- Steps to reproduce the issue
- Any relevant logs, screenshots, or error messages

### Suggesting Enhancements

If you have an idea for an enhancement, please open an issue on [GitHub](https://github.com/your-repo/shuemo/issues) and include:

- A clear and descriptive title
- A detailed description of the enhancement
- The motivation and benefits for the enhancement
- Any examples or mockups if applicable

### Your First Pull Request

Working on your first Pull Request? You can learn how from this video by [Midudev](https://github.com/midudev): [How to Contribute to an Open Project on GitHub](https://www.youtube.com/watch?v=niPExbK8lSw&t=358s)

### Submitting a Pull Request

To submit a pull request:

1. Fork the repository.
2. Create a new branch from `main` (e.g., `fet/awesome-feature`).
3. Make your changes in your branch.
4. Write clear and descriptive commit messages.
5. Push your branch to your forked repository.
6. Open a pull request against the `main` branch of the Shuemo repository.
7. Ensure your pull request description clearly describes the problem and solution, and includes the issue number if applicable.

### Development Workflow

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-repo/shuemo.git
    ```

2. **Navigate to the project directory**:
    ```sh
    cd shuemo
    ```

3. **Run in Docker**:
    ```sh
    docker compose up
    ```

4. **Inject Spring/demo.sql in the database**:


### Development Workflow without Docker

- Change IPs

**Run FrontEnd**:
    ```sh
    cd React
    ```
    ```sh
    npm install
    ```
    ```sh
    npm run dev 
    ```

**Run BackEnd**:
    ```sh
    cd Spring
    ```
- Run whit maven
- Inject Spring/demo.sql


### Code Style

Please follow these guidelines to keep the codebase clean and readable:

- Use meaningful and descriptive names for variables and functions.
- Keep functions and methods small and focused on a single task.
- Use comments to explain the purpose of complex code.
- Follow the existing coding style and conventions used in the project.

### Testing

Please write tests for any new features or bug fixes, and ensure all existing tests pass before submitting your pull request. We use SpringBootTest.  (Allready doesn't have test)

### Documentation

Ensure that any new features or significant changes are documented. Update the README.md or create new documentation files as necessary.

### Branch Organization

Submit all changes directly to the `main` branch. We do our best to keep `main` in good shape, with all tests passing. Code that lands in `main` must be compatible with the latest stable release. It may contain additional features, but no breaking changes.

### Commit Message Template

**Available Headers:** `ADD`, `FIX`, `REFACTOR`, `DELETE`, `DOCS`.

**Example Commit:** `ADD(Email): Implemented email sending`

**Commit Description:**
Brief optional summary of the change.

#### How to Make a Commit

1. **Commit Header:**  
   Choose one of the following options based on the type of change made:

   - `ADD`: For adding new features or files.
   - `FIX`: For fixing errors or bugs.
   - `REFACTOR`: For modifying code without changing its functionality.
   - `DELETE`: For removing code, files, or other entities.
   - `DOCS`: For changes related to documentation.

2. **Commit Content:**  
   Inside the parentheses `()`, specify what was modified in the commit.

3. **Commit Summary:**  
   After `:`, provide a brief and clear summary of the change made.

#### Detailed Example

```
ADD(Email): Implemented email sending functionality

- Implemented the `EmailSender` class to handle email sending using SMTP.
- Added necessary configurations in the `email_config.json` file.
```

#### Additional Notes

- Keep commit messages clear and concise.
- Use present tense in the summary (`Implemented`, `Fixed`, `Refactored`, `Deleted`, `Documented`) to indicate the action taken.
- Ensure each commit represents a logical and coherent change in the code or documentation.

### License

By contributing to Shuemo, you agree that your contributions will be licensed under the MIT License.

## Thank You!

Your contributions make Shuemo better. Thank you for taking the time to contribute!