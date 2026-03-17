Model Card — HR Retention Risk Scoring Model

1. Model objective
The model is designed to estimate the risk of voluntary employee departure in an HR context. Its main use case is to support HR teams in identifying at-risk employees, understanding the drivers behind attrition, and prioritizing retention actions. It takes as input structured HR data such as absenteeism, satisfaction, engagement, performance, employment status, department, and salary, along with behavioral signals when available. It outputs a risk score, a risk level, a textual explanation, and recommended HR actions.

2. Training data
The model relies on an enriched dataset built from HRDataset_v14.csv and IBM.csv, combined through the Remplissage.py script. The final dataset contains approximately 1,781 samples and covers multiple HR dimensions such as roles, departments, performance, engagement, and employment status. The data provides a reasonable diversity of HR situations for demonstration purposes, although it remains limited in real-world representativeness. Known limitations include partially synthetic data, reconstructed variables, and some randomness introduced during the merging process, which may affect consistency and realism.

3. Performance
The current version does not rely on a traditional machine learning training pipeline and therefore does not report standard metrics such as accuracy, precision, recall, or F1-score. Instead, performance is evaluated qualitatively through interpretability, business relevance, and the model’s ability to prioritize at-risk employees. As a result, it should be considered a proof of concept rather than a validated predictive model.

4. Limitations
The model has several known limitations. Its rule-based logic can lead to sensitivity to specific conditions and lacks robustness outside the demonstration dataset. It does not cover complex real-world situations such as missing or inconsistent data, new job roles, or qualitative human factors. Additionally, the dataset includes sensitive variables (e.g., gender, ethnicity, marital status), and combined with partially synthetic data, this introduces potential risks of bias and limited representativeness.

5. Risks & mitigation
There are risks of misuse, including interpreting the score as a definitive prediction, using it for employee sanction, or applying it in automated decision-making without human oversight. There is also a risk of indirect discrimination if sensitive attributes are not handled properly. To mitigate these risks, the system should be clearly positioned as a decision-support tool, require human validation, exclude sensitive variables from the scoring logic, and include explicit warnings about its limitations. Fairness audits should also be conducted across subgroups.

6. Energy and frugality
The model is highly lightweight, as the scoring logic is directly embedded in the application and does not require heavy machine learning infrastructure. It runs almost instantly on CPU, requires no GPU, and has a very low energy footprint. Future improvements could include formally measuring energy consumption using tools such as CodeCarbon, as well as tracking inference time and memory usage.

7. Cybersecurity
In its current state, the system includes only basic input handling and would require stronger safeguards for production use. This includes validating input formats, controlling input values, handling errors properly, and implementing logging. No sensitive secrets should be stored in the codebase, and API keys (if added later) must be secured through environment variables. Additionally, the dataset should be anonymized, real identifiers removed, and access to HR dashboards restricted to authorized users.