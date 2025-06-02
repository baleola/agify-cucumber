# Agify.io API Test Suite

Test suite for the [Agify.io API](https://agify.io) using Cucumber.js and TypeScript.

## Requirements

- **Node.js**: v22.16.0
- **npm**: v10.9.2

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run tests**
   ```bash
   npm test
   ```
3. **With Reports**

    ```bash
    npm run test:report
    ```

## Project Structure

```
features/           # Gherkin test scenarios
src/
  step-definitions/ # Step implementations
  support/          # Test utilities and helpers
```

## CI/CD

The project includes GitHub Actions workflow that:

- Runs on pull requests to `main` branch
- Runs on pushes to `main` branch
- Can be triggered manually from GitHub Actions tab

### Manual Trigger

1. Go to the GitHub repo
2. Click "Actions" tab
3. Select and run workflow

## Rate Limiting

⚠️ **Note**: The Agify.io API has a free tier limit of 100 requests per day per IP address. If you hit this limit during testing, you can use a VPN to get a different IP address and continue testing.
