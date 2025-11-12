# Mock Data Generator

This directory contains scripts to generate mock data for testing the CS Evaluation Dashboard.

## Usage

### Generate Mock Data

To generate 50 mock evaluations (default):

```bash
npm run generate-mock
```

To generate a custom number of evaluations:

```bash
node scripts/generate-mock-data.js 100
```

This will generate 100 mock evaluations.

## What the Script Does

The mock data generator creates realistic CS evaluation records with:

- **6 different agents**: Sarah Johnson, Michael Chen, Emily Rodriguez, David Kim, Jessica Williams, Alex Thompson
- **Realistic customer messages**: Various common customer service scenarios
- **Appropriate CS replies**: Professional responses to customer inquiries
- **Randomized scores**: Accuracy, tone, clarity, completeness, and relevance (60-100 range)
- **Feedback comments**: Constructive feedback for each evaluation
- **Date distribution**: Evaluations spread across the last 30 days

## Requirements

- Supabase credentials must be configured in `.env.local`
- The `cs_evaluation` table must exist in your Supabase database
- Run `npm install` to ensure all dependencies are installed

## Data Distribution

The script generates data with:
- Random distribution across 6 agents
- Scores typically ranging from 60-100 (realistic CS performance)
- Dates spread across the last 30 days
- Varied customer scenarios and responses

This creates a realistic dataset for testing dashboard features like:
- Agent performance comparison
- Score distribution charts
- Trend analysis over time
- Evaluation details and filtering
