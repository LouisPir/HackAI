HR Retention AI
1. Overview

HR Retention AI is a simple web application designed to help HR teams identify employees who may be at risk of leaving, understand the reasons behind this risk, and take action early. It is built as a decision-support tool, meaning it supports HR analysis but does not replace human judgment.

2. Context

Employee turnover is a major issue for organizations, as it leads to loss of skills, recruitment costs, and team disruption. This project aims to provide a clearer and more structured way for HR teams to detect early warning signs, prioritize actions, and better understand attrition trends.

3. Objective

The application allows users to load an HR dataset, compute a risk score for each employee, and access insights that are easy to interpret. Users can search for an employee, view their risk score, read an explanation of the main factors, and receive simple HR recommendations. An analytics page also provides global indicators such as attrition rate and breakdowns by department, performance, and satisfaction.

4. Technical structure

The main application is located in the frontend-app/ folder and is built using React and Vite. The scoring logic is implemented directly in the frontend (data.js) using simple HR variables such as absenteeism, engagement, satisfaction, and performance. A Python script (dataset/Remplissage.py) is used to prepare and enrich the dataset.

5. Approach

The system is designed to be simple, fast, and explainable. Instead of relying on complex machine learning models, it uses a rule-based scoring logic that is easy to understand. This makes the tool more accessible to non-technical HR users.

6. Limitations

The current version has several limitations. There is no backend API, no full machine learning pipeline, and no formal evaluation of performance or fairness. The scoring system is rule-based and intended mainly for demonstration. It should not be used for real HR decisions.

7. Responsible AI & next steps

The project emphasizes Responsible AI principles: results are explainable, data is anonymized, and human validation is required. Future improvements include adding a backend, integrating methods like SHAP or LIME for better explainability, conducting fairness audits, and improving security and access control.

Overall, HR Retention AI is a lightweight and explainable prototype that shows how AI can support HR teams in a more proactive and responsible way.
