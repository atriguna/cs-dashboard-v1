# Color Scheme Documentation

## Score Color Mapping

Dashboard menggunakan skema warna yang konsisten untuk menampilkan score evaluations:

### Score Ranges & Colors:

| Range | Color | Meaning | Hex Code |
|-------|-------|---------|----------|
| **0-20** | 🔴 Red | Poor performance - needs immediate attention | `#ef4444` |
| **21-40** | 🟠 Orange | Below average - requires improvement | `#f59e0b` |
| **41-60** | 🟡 Yellow | Average - meets basic standards | `#eab308` |
| **61-80** | 🟢 Green | Good - above average performance | `#10b981` |
| **81-100** | 🔵 Blue | Excellent - outstanding service | `#3b82f6` |

### Implementation:

#### 1. DistributionChart.tsx
```typescript
const COLOR_MAP: Record<string, string> = {
  '0-20': '#ef4444',    // Red
  '21-40': '#f59e0b',   // Orange
  '41-60': '#eab308',   // Yellow
  '61-80': '#10b981',   // Green
  '81-100': '#3b82f6',  // Blue
};
```

#### 2. EvaluationTable.tsx
```typescript
const getScoreColor = (score: number | null) => {
  if (!score) return 'text-gray-400';
  if (score > 80) return 'text-blue-600 dark:text-blue-400';      // Excellent
  if (score > 60) return 'text-green-600 dark:text-green-400';    // Good
  if (score > 40) return 'text-yellow-600 dark:text-yellow-400';  // Average
  if (score > 20) return 'text-orange-600 dark:text-orange-400';  // Below average
  return 'text-red-600 dark:text-red-400';                        // Poor
};
```

### Usage:

Skema warna ini digunakan di:
- **Score Distribution Pie Chart** - untuk menampilkan distribusi score
- **Evaluation Table** - untuk menampilkan score individual (Accuracy, Tone, Clarity, dll)
- **Modal Detail** - untuk menampilkan score detail per evaluation
- **Score Badges** - untuk menampilkan score dalam bentuk badge

### Notes:

- Warna harus konsisten di semua komponen
- Dark mode menggunakan variant yang lebih terang (e.g., `dark:text-green-400`)
- Badge menggunakan background dengan opacity rendah (e.g., `bg-green-100 dark:bg-green-900/30`)

---

**Last Updated**: 2025-11-12
**Fixed**: Score 61-80 sekarang berwarna hijau (sebelumnya salah biru)
