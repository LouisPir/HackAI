TECHNICAL DOCUMENTATION HR RETENTION AI
PROJECT OVERVIEW

This project aims to build a simple and explainable tool to estimate employee turnover risk using HR data. The goal is to help HR teams identify employees who may be at risk of leaving and take preventive actions. The system is based on a proxy target variable: Termd = 0 → employee still active, Termd = 1 → employee has left. The tool is designed as a decision-support system, not an automated decision-maker.

DATASET

The project uses two datasets: HRDataset_v14.csv and IBM.csv, which are merged into a final dataset called HRDataset_Expanded_v2.csv. The dataset contains around 1781 rows and is composed of structured HR data. The task is risk scoring (attrition proxy). Key features include salary, department, position, performance, engagement, satisfaction, absences, and employment status.

DATA PREPROCESSING

The dataset is prepared using the script dataset/Remplissage.py. The main steps are merging the two datasets, aligning column formats, generating missing values, creating synthetic employee data, converting salary from monthly to annual, and assigning managers. Some transformations include randomness, so the dataset is partly synthetic.

MODEL / SCORING SYSTEM

The project uses a rule-based scoring approach instead of a full machine learning model. The logic is implemented directly in the frontend (data.js). This approach is easy to understand, fast to execute, fully explainable, and suitable for a demo or hackathon. The score is based on variables such as absences, satisfaction, engagement, and performance.

EVALUATION

There is no formal machine learning evaluation (no accuracy, precision, recall, or F1-score). The focus is on interpretability, business logic consistency, and the ability to prioritize employees. This makes the project a proof of concept rather than a validated predictive model.

ETHICAL CONSIDERATIONS

To reduce risks of bias and misuse, the system is a decision-support tool only, human validation is required, sensitive attributes should not be used for decisions, and explanations are always provided with the score.

CYBERSECURITY & DATA PROTECTION

The dataset is anonymized or synthetic, and no real personal identifiers should be used. No secrets are stored in the repository. In a production context, access should be restricted, dashboards secured, and data properly managed.

DATA ANALYSIS & VISUALIZATION

The application includes analytics such as attrition rate, active vs terminated employees, and breakdowns by department, performance, and satisfaction. JavaScript is used for frontend analytics and Python for data preparation.

TOOLS & ENVIRONMENT

The project uses React and Vite for the frontend, JavaScript for business logic, Python (pandas, numpy) for data processing, and Node.js/npm.

LIMITATIONS

The project has several limitations: no backend API, no full machine learning pipeline, rule-based scoring, partly synthetic dataset, and no formal fairness evaluation. It should not be used for real HR decision-making.

CONCLUSION

HR Retention AI is a lightweight and explainable prototype that shows how AI can support HR teams in identifying turnover risk. It highlights explainability, responsible AI, and human-in-the-loop decision-making, and is intended for demonstration purposes only.

REFERENCES

React: 
https://react.dev/
Pandas: https://pandas.pydata.org/docs/
Scikit-learn: https://scikit-learn.org/stable/
GDPR: https://gdpr.eu/what-is-gdpr/
