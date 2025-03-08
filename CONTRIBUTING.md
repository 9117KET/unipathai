# Contributing to UniPathAI

First off, thank you for considering contributing to UniPathAI! It's people like you that make UniPathAI such a great tool for students worldwide.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct. Please report unacceptable behavior to conduct@unipathai.com.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps which reproduce the problem
- Provide specific examples to demonstrate the steps
- Describe the behavior you observed after following the steps
- Explain which behavior you expected to see instead and why
- Include screenshots if possible

### Suggesting Enhancements

If you have a suggestion for the project, we'd love to hear it. Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- A clear and descriptive title
- A detailed description of the proposed enhancement
- Examples of how the enhancement would be used
- Any potential drawbacks or considerations

### Your First Code Contribution

Unsure where to begin contributing? You can start by looking through these `beginner` and `help-wanted` issues:

- Beginner issues - issues which should only require a few lines of code
- Help wanted issues - issues which should be a bit more involved than beginner issues

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Development Process

1. **Set up your environment**

   ```bash
   npm install
   cp .env.example .env.local
   # Configure your .env.local
   ```

2. **Create a branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**

   - Write meaningful commit messages
   - Follow the coding style
   - Add tests if applicable
   - Update documentation as needed

4. **Test your changes**

   ```bash
   npm run test
   npm run lint
   ```

5. **Push and create a PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### JavaScript/TypeScript Styleguide

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable names
- Comment complex logic
- Keep functions small and focused

### Documentation Styleguide

- Use Markdown
- Reference functions and classes in backticks: \`functionName()\`
- Include code examples when relevant
- Keep documentation up to date with code changes

## Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/            # React components
├── lib/                  # Utility functions
├── types/               # TypeScript definitions
└── styles/             # Global styles
```

## Testing

- Write tests for new features
- Update tests when modifying existing features
- Ensure all tests pass before submitting PR
- Include both unit and integration tests when applicable

## Additional Notes

### Issue and Pull Request Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `help-wanted` - Extra attention is needed
- `beginner` - Good for newcomers

## Recognition

Contributors will be recognized in our:

- README.md
- Contributors page on our website
- Release notes

Thank you for contributing to UniPathAI! 🎉
