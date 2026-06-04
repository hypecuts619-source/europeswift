# SWIFT / BIC Code Dataset

> A comprehensive, free, and regularly updated dataset of SWIFT/BIC codes for financial institutions worldwide.

## 🚀 Quick Start

This repository contains a downloadable dataset of SWIFT/BIC codes. Use it for validation, lookup, or integration into your financial applications.

**Download the latest dataset:**  
➡️ [`swift_codes.csv`](./data/swift_codes.csv)  
➡️ [`swift_codes.json`](./data/swift_codes.json)

```csv
SWIFT_CODE,BANK_NAME,CITY,COUNTRY,COUNTRY_CODE
CHASUS33,JP Morgan Chase,New York,USA,US
BOFAUS3N,Bank of America,Charlotte,USA,US
```

## 📖 About
A SWIFT/BIC code is an 8-11 character identifier used to verify international banking transactions. This dataset aims to provide developers, freelancers, and small businesses with a reliable offline reference.

**Key Features:**

* 📁 Available in CSV, JSON, and SQL formats.
* 🌍 Covers 200+ countries.
* 🔄 Updated monthly (manual submission or via our API).
* 🆓 **100% free for non-commercial use.**

## 💻 Usage Examples

### Python
```python
import pandas as pd
df = pd.read_csv('swift_codes.csv')
print(df[df['COUNTRY'] == 'DE'].head())
```

### JavaScript
```javascript
const swiftData = require('./swift_codes.json');
const findBank = (code) => swiftData.find(entry => entry.SWIFT_CODE === code);
console.log(findBank('CHASUS33'));
```

### REST API (Online Version)
If you prefer an online lookup tool: 👉 Try the [live SWIFT Code Directory](https://swiftcodedir.com/)

## 🗺️ Dataset Schema

| Column | Type | Description |
| :--- | :--- | :--- |
| SWIFT_CODE | string | The 8 or 11 character SWIFT/BIC code. |
| BANK_NAME | string | Official name of the financial institution. |
| CITY | string | Registered city of the branch. |
| COUNTRY | string | Full country name. |
| COUNTRY_CODE | string | ISO 3166-1 alpha-2 country code. |

## 🤝 Contributing
Found a missing or incorrect code? We welcome contributions!

1. Fork the repository.
2. Update the `data/` directory.
3. Submit a Pull Request with your sources.

Alternatively, report an issue.

## 📄 License

This dataset is provided for **non-commercial use only**. Please respect this limitation when integrating into your projects.
