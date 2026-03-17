Technical Documentation — HR Retention AI

1. Technical stack
The project is built with a simple and modern stack. The frontend uses React with Vite for fast development and React Router for navigation between pages. For data processing, Python is used with libraries such as pandas and numpy to manipulate and prepare the HR dataset.

2. Technical structure
The main application is located in the frontend-app/ folder. The key files include main.jsx, which is the React entry point, and App.jsx, which contains the main application logic. The global styles are defined in index.css, and most of the business logic related to data is implemented in data.js.
On the data side, the script dataset/Remplissage.py is used to merge and enrich the HR datasets.

3. Application workflow
When the application starts, the dataset is first loaded using the loadDataset() function. Then, global analytics are computed with computeAnalytics(data), and the results are displayed in both the Home page and the Analytics page.

The Home page allows users to search for an employee, compute their resignation risk, view an explanation of the score, and get recommended HR actions. It also displays the top 10 most at-risk active employees.

The Analytics page provides a global overview of the data, including attrition rate, distribution of active vs terminated employees, and breakdowns by department, performance, and satisfaction. It also shows the relative importance of some variables.

4. Core business functions
The main logic is implemented in src/data.js. The key functions are loadDataset(), computeRisk(), buildExplanation(), buildSolutions(), and computeAnalytics().
Each function has a clear role: loading and structuring data, computing a risk score, generating explanations, suggesting HR actions, and calculating aggregated metrics for the dashboard.

5. Scoring logic
The system relies on simple and interpretable HR variables such as absenteeism, satisfaction, engagement, performance, and employment status. The goal of this design is to keep the model easy to understand, fast to execute, and suitable for a hackathon-style demonstration. The focus is more on explainability than on complex machine learning.

6. Running the project
To run the frontend, you need to go into the frontend-app folder, install dependencies with npm install, and start the development server with npm run dev. You can also build the project using npm run build and preview it with npm run preview.
To generate the dataset, you can run the Python script Remplissage.py from the dataset folder.

7. Technical limitations
The current version has several limitations. There is no backend API, no session persistence, and no authentication system. There is also no tracking of usage, no production-ready machine learning pipeline, and no automated fairness evaluation included in the repository.

8. Recommended improvements
Several improvements can be made to move toward a production-ready system. On the backend side, an API could be developed using FastAPI or Flask, with proper endpoints for prediction and explanation.
From an MLOps perspective, it would be useful to separate training and inference, version the models, and log predictions.
For Responsible AI, fairness audits, SHAP or LIME explanations, and data validation should be added, along with clear warning messages in the interface.
Finally, security can be improved by implementing role-based access control, logging, encryption of sensitive data, and compliance with regulations such as GDPR.