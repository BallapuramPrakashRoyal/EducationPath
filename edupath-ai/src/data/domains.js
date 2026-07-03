// EduPath AI — content model
// Each domain has an ordered "trail" of modules (difficulty roughly increasing),
// a short diagnostic quiz used to place the learner on the trail, and a
// per-module quiz used to adapt the path as the learner progresses.

export const DOMAINS = [
  {
    id: 'webdev',
    title: 'Web Development',
    icon: 'Globe',
    tagline: 'From your first tag to a deployed full-stack app.',
    diagnostic: [
      {
        q: 'What does HTML primarily define on a web page?',
        options: ['Structure and content', 'Visual styling', 'Server logic', 'Database schema'],
        answer: 0
      },
      {
        q: 'Which CSS property controls spacing outside an element\u2019s border?',
        options: ['padding', 'margin', 'gap', 'inset'],
        answer: 1
      },
      {
        q: 'In JavaScript, what does `const` do?',
        options: ['Declares a re-assignable variable', 'Declares a block-scoped, non-reassignable binding', 'Declares a function', 'Declares a CSS class'],
        answer: 1
      },
      {
        q: 'What is the main job of a frontend framework like React?',
        options: ['Managing server databases', 'Building reusable, stateful UI components', 'Compiling CSS', 'Routing DNS requests'],
        answer: 1
      },
      {
        q: 'What does an API endpoint typically return in a modern web app?',
        options: ['A compiled binary', 'Structured data, often JSON', 'A CSS stylesheet', 'A font file'],
        answer: 1
      },
      {
        q: 'What is the purpose of version control (e.g. Git) in a project?',
        options: ['Minifying code', 'Tracking and coordinating changes to code over time', 'Hosting a database', 'Styling components'],
        answer: 1
      }
    ],
    modules: [
      {
        id: 'wd-1', title: 'Web Foundations', hours: 8, difficulty: 1,
        topics: ['Semantic HTML', 'CSS box model & layout', 'Responsive design basics', 'Dev tools & inspecting pages'],
        resources: [
          { title: 'MDN Web Docs — HTML & CSS guides', type: 'Reference' },
          { title: 'freeCodeCamp — Responsive Web Design', type: 'Interactive course' },
          { title: 'Flexbox Froggy', type: 'Practice game' }
        ],
        quiz: [
          { q: 'Which tag is most semantically correct for a page\u2019s main navigation?', options: ['<div class="nav">', '<nav>', '<section>', '<header>'], answer: 1, explanation: 'The <nav> element explicitly signals navigation to browsers and assistive tech.' },
          { q: 'flex-direction: column arranges children:', options: ['Left to right', 'Top to bottom', 'In a grid', 'Randomly'], answer: 1, explanation: 'Column stacks flex items vertically.' },
          { q: 'A responsive design primarily adapts to:', options: ['Browser vendor', 'Viewport size', 'Server load', 'File size'], answer: 1, explanation: 'Responsive layouts respond to screen/viewport dimensions.' },
          { q: 'The CSS box model, from inside out, is:', options: ['Content, padding, border, margin', 'Margin, border, padding, content', 'Border, content, margin, padding', 'Padding, margin, border, content'], answer: 0, explanation: 'Content sits innermost, then padding, border, and margin outward.' }
        ]
      },
      {
        id: 'wd-2', title: 'JavaScript Essentials', hours: 12, difficulty: 2,
        topics: ['Variables, functions & scope', 'Arrays & objects', 'DOM manipulation', 'Async JS: promises & fetch'],
        resources: [
          { title: 'JavaScript.info — core tutorial', type: 'Reference' },
          { title: 'Eloquent JavaScript (free online book)', type: 'Book' },
          { title: 'freeCodeCamp — JavaScript Algorithms', type: 'Interactive course' }
        ],
        quiz: [
          { q: 'Which method adds an item to the end of an array?', options: ['.push()', '.pop()', '.shift()', '.slice()'], answer: 0, explanation: '.push() appends to the end; .pop() removes from the end.' },
          { q: 'A Promise that has resolved successfully is in which state?', options: ['pending', 'fulfilled', 'rejected', 'idle'], answer: 1, explanation: 'Promises move from pending to either fulfilled or rejected.' },
          { q: 'What does `document.querySelector` return?', options: ['An array of nodes', 'The first matching element or null', 'A string', 'A CSS rule'], answer: 1, explanation: 'It returns the first match, or null if none is found.' },
          { q: 'Which keyword creates a block-scoped, reassignable variable?', options: ['const', 'let', 'var only', 'function'], answer: 1, explanation: '`let` is block-scoped and reassignable, unlike `const`.' }
        ]
      },
      {
        id: 'wd-3', title: 'React Fundamentals', hours: 14, difficulty: 3,
        topics: ['Components & JSX', 'Props & state', 'Hooks (useState, useEffect)', 'Conditional & list rendering'],
        resources: [
          { title: 'Official React documentation — \u201cLearn React\u201d', type: 'Reference' },
          { title: 'Scrimba — Learn React for free', type: 'Interactive course' }
        ],
        quiz: [
          { q: 'What triggers a React component to re-render?', options: ['Changing a local JS variable', 'A state or props update', 'Refreshing devtools', 'Adding a comment'], answer: 1, explanation: 'React re-renders in response to state or prop changes.' },
          { q: 'The useEffect hook is primarily used for:', options: ['Styling components', 'Side effects like data fetching', 'Declaring constants', 'Routing'], answer: 1, explanation: 'useEffect runs side effects after render, e.g. fetching data.' },
          { q: 'Keys in a rendered list help React:', options: ['Style items', 'Efficiently identify which items changed', 'Sort the array', 'Fetch data faster'], answer: 1, explanation: 'Keys let React track items across re-renders.' },
          { q: 'Props in React are:', options: ['Mutable internal state', 'Read-only data passed from a parent', 'CSS variables', 'Global variables'], answer: 1, explanation: 'Props flow one-way from parent to child and are read-only.' }
        ]
      },
      {
        id: 'wd-4', title: 'Backend with Node & Express', hours: 12, difficulty: 3,
        topics: ['Node.js runtime basics', 'Building REST APIs with Express', 'Middleware & routing', 'Environment config & error handling'],
        resources: [
          { title: 'Express.js official guide', type: 'Reference' },
          { title: 'Node.js official docs', type: 'Reference' }
        ],
        quiz: [
          { q: 'REST APIs commonly use which HTTP method to create a resource?', options: ['GET', 'POST', 'DELETE', 'OPTIONS'], answer: 1, explanation: 'POST is conventionally used to create new resources.' },
          { q: 'Express middleware functions primarily:', options: ['Style the frontend', 'Run logic between the request and response', 'Compile TypeScript', 'Manage CSS'], answer: 1, explanation: 'Middleware intercepts requests/responses to add logic like auth or logging.' },
          { q: 'A 404 status code means:', options: ['Server error', 'Resource not found', 'Success', 'Redirect'], answer: 1, explanation: '404 indicates the requested resource could not be found.' },
          { q: 'Storing secrets like API keys should be done via:', options: ['Hardcoding in source', 'Environment variables', 'Comments', 'Frontend localStorage'], answer: 1, explanation: 'Environment variables keep secrets out of source control.' }
        ]
      },
      {
        id: 'wd-5', title: 'Databases & Data Modeling', hours: 10, difficulty: 3,
        topics: ['Relational vs NoSQL', 'Schema design & relationships', 'CRUD with an ORM', 'Basic indexing & queries'],
        resources: [
          { title: 'PostgreSQL official tutorial', type: 'Reference' },
          { title: 'MongoDB University — free courses', type: 'Interactive course' }
        ],
        quiz: [
          { q: 'A relational database organizes data primarily into:', options: ['Documents', 'Tables with rows and columns', 'Key-value pairs only', 'Graphs only'], answer: 1, explanation: 'Relational DBs use structured tables linked by keys.' },
          { q: 'A foreign key is used to:', options: ['Encrypt a column', 'Reference a row in another table', 'Index text search', 'Style a query'], answer: 1, explanation: 'Foreign keys link rows across tables to model relationships.' },
          { q: 'An ORM primarily helps you:', options: ['Style your app', 'Interact with a database using code objects', 'Deploy servers', 'Write CSS'], answer: 1, explanation: 'ORMs map database rows to objects in your programming language.' },
          { q: 'Indexing a column mainly improves:', options: ['Write speed only', 'Read/query speed', 'CSS rendering', 'File compression'], answer: 1, explanation: 'Indexes speed up lookups at some cost to write performance.' }
        ]
      },
      {
        id: 'wd-6', title: 'Auth, Testing & Deployment', hours: 10, difficulty: 4,
        topics: ['Authentication & sessions/JWT', 'Unit & integration testing', 'CI basics', 'Deploying a full-stack app'],
        resources: [
          { title: 'Auth0 / JWT.io — auth concepts', type: 'Reference' },
          { title: 'Testing Library docs', type: 'Reference' }
        ],
        quiz: [
          { q: 'A JWT is primarily used to:', options: ['Style a page', 'Represent claims for authentication/authorization', 'Query a database', 'Bundle JavaScript'], answer: 1, explanation: 'JWTs carry signed claims used to verify a user\u2019s identity/permissions.' },
          { q: 'Unit tests are best described as testing:', options: ['The whole deployed system', 'A small isolated piece of logic', 'Only UI colors', 'Server uptime'], answer: 1, explanation: 'Unit tests isolate and verify small units of logic.' },
          { q: 'Continuous Integration (CI) typically:', options: ['Manually emails developers', 'Automatically builds/tests code on each change', 'Replaces version control', 'Only formats code'], answer: 1, explanation: 'CI automates building and testing on every push.' },
          { q: 'Environment-specific config (dev/staging/prod) helps you:', options: ['Avoid writing tests', 'Safely vary settings per environment', 'Skip deployment', 'Remove the need for a database'], answer: 1, explanation: 'Per-environment config avoids leaking prod secrets into dev, etc.' }
        ]
      },
      {
        id: 'wd-7', title: 'Capstone: Full-Stack Project', hours: 16, difficulty: 4,
        topics: ['Planning & scoping a project', 'Building end-to-end features', 'Performance & accessibility pass', 'Shipping & presenting'],
        resources: [
          { title: 'web.dev — performance & accessibility guides', type: 'Reference' },
          { title: 'GitHub — explore real open-source projects', type: 'Practice' }
        ],
        quiz: [
          { q: 'A good first step before coding a capstone project is:', options: ['Writing tests only', 'Scoping features and defining an MVP', 'Choosing fonts', 'Deploying immediately'], answer: 1, explanation: 'Scoping an MVP keeps a capstone project achievable and focused.' },
          { q: 'Accessibility (a11y) passes typically check for:', options: ['Bundle size only', 'Keyboard navigation and screen-reader support', 'Server cost', 'Git history'], answer: 1, explanation: 'a11y passes verify the app is usable via keyboard and assistive tech.' },
          { q: 'A meaningful way to present a finished project is to:', options: ['Only show source code', 'Demo the user flow and explain key decisions', 'List every library used', 'Read the README aloud'], answer: 1, explanation: 'Demoing the flow and reasoning communicates impact far better than a code dump.' },
          { q: 'Before shipping, checking Lighthouse or similar tools helps catch:', options: ['Grammar issues', 'Performance and accessibility regressions', 'Git conflicts', 'Database schema errors'], answer: 1, explanation: 'These tools audit performance, accessibility, SEO, and best practices.' }
        ]
      }
    ]
  },
  {
    id: 'datasci',
    title: 'Data Science & AI',
    icon: 'BrainCircuit',
    tagline: 'From spreadsheets to shipping a trained model.',
    diagnostic: [
      { q: 'What is the primary use of the pandas library in Python?', options: ['Web serving', 'Data manipulation & analysis', 'CSS styling', '3D rendering'], answer: 1 },
      { q: 'In statistics, the mean of a dataset is:', options: ['The most frequent value', 'The middle value when sorted', 'The sum divided by the count', 'The range'], answer: 2 },
      { q: 'What best describes "overfitting" in machine learning?', options: ['A model that generalizes well', 'A model that memorizes training data but performs poorly on new data', 'A model with too few parameters', 'A dataset with missing values'], answer: 1 },
      { q: 'Which of these is a supervised learning task?', options: ['Clustering customers with no labels', 'Predicting house prices from labeled examples', 'Reducing dimensions of data', 'Randomly grouping data'], answer: 1 },
      { q: 'What does a neural network\u2019s "activation function" do?', options: ['Loads data from disk', 'Introduces non-linearity into the model', 'Compresses images', 'Splits training/test data'], answer: 1 },
      { q: 'Why do we split data into training and test sets?', options: ['To save disk space', 'To evaluate a model on unseen data', 'To speed up loading', 'To reduce the number of features'], answer: 1 }
    ],
    modules: [
      {
        id: 'ds-1', title: 'Python for Data Analysis', hours: 10, difficulty: 1,
        topics: ['Python syntax refresher', 'NumPy arrays', 'pandas DataFrames', 'Data cleaning basics'],
        resources: [
          { title: 'Kaggle Learn — Python & Pandas', type: 'Interactive course' },
          { title: 'pandas official documentation', type: 'Reference' }
        ],
        quiz: [
          { q: 'A pandas DataFrame is best described as:', options: ['A single number', 'A 2D labeled table of data', 'A CSS selector', 'A neural network layer'], answer: 1, explanation: 'DataFrames are labeled, tabular structures similar to a spreadsheet.' },
          { q: 'Which pandas method quickly summarizes numeric columns?', options: ['.describe()', '.plot()', '.merge()', '.concat()'], answer: 0, explanation: '.describe() returns count, mean, std, min/max, and quartiles.' },
          { q: 'Handling missing data commonly involves:', options: ['Ignoring the dataset entirely', 'Dropping or imputing missing values', 'Always deleting the column', 'Converting to images'], answer: 1, explanation: 'Missing values are typically dropped or filled (imputed) thoughtfully.' },
          { q: 'NumPy arrays are valued in data work mainly for:', options: ['Built-in CSS support', 'Fast, vectorized numerical operations', 'Automatic web hosting', 'Text formatting'], answer: 1, explanation: 'NumPy enables efficient vectorized math over large arrays.' }
        ]
      },
      {
        id: 'ds-2', title: 'Statistics & Probability', hours: 10, difficulty: 2,
        topics: ['Descriptive statistics', 'Probability distributions', 'Hypothesis testing basics', 'Correlation vs causation'],
        resources: [
          { title: 'Khan Academy — Statistics & Probability', type: 'Interactive course' },
          { title: 'Seeing Theory — visual probability primer', type: 'Interactive visualization' }
        ],
        quiz: [
          { q: 'A p-value below the significance threshold generally suggests:', options: ['The result is definitely true', 'Evidence against the null hypothesis', 'The sample size was too small', 'A coding error'], answer: 1, explanation: 'A low p-value is evidence against the null hypothesis, not proof of the alternative.' },
          { q: 'Correlation between two variables implies:', options: ['One causes the other', 'They tend to move together, not necessarily causally', 'They are unrelated', 'One is always larger'], answer: 1, explanation: 'Correlation does not by itself establish causation.' },
          { q: 'The standard deviation measures:', options: ['The central value', 'The spread of data around the mean', 'The most frequent value', 'The sample size'], answer: 1, explanation: 'Standard deviation quantifies dispersion around the mean.' },
          { q: 'A normal distribution is characterized by:', options: ['A flat line', 'A symmetric bell curve around the mean', 'Only positive values', 'Discrete categories'], answer: 1, explanation: 'The normal distribution is symmetric and bell-shaped.' }
        ]
      },
      {
        id: 'ds-3', title: 'Data Visualization', hours: 8, difficulty: 2,
        topics: ['Matplotlib & seaborn basics', 'Choosing the right chart', 'Storytelling with data', 'Dashboards overview'],
        resources: [
          { title: 'Matplotlib official gallery & docs', type: 'Reference' },
          { title: 'Storytelling with Data (concepts overview)', type: 'Book' }
        ],
        quiz: [
          { q: 'For showing a trend over time, the best chart is usually a:', options: ['Pie chart', 'Line chart', 'Scatter of unrelated points', 'Word cloud'], answer: 1, explanation: 'Line charts naturally show change across a continuous axis like time.' },
          { q: 'A cluttered chart with too many colors/labels mainly hurts:', options: ['Load speed only', 'Clarity and interpretability', 'Data accuracy', 'File size'], answer: 1, explanation: 'Visual clutter makes the message harder to read, even if data is correct.' },
          { q: 'A box plot is especially useful for showing:', options: ['Exact single values', 'Distribution spread and outliers', 'Network relationships', 'Geographic data'], answer: 1, explanation: 'Box plots summarize quartiles, median, and outliers.' },
          { q: 'Good data storytelling primarily aims to:', options: ['Show every possible metric at once', 'Guide the viewer to a clear takeaway', 'Use as many colors as possible', 'Avoid all labels'], answer: 1, explanation: 'Effective visualizations highlight the key insight, not everything at once.' }
        ]
      },
      {
        id: 'ds-4', title: 'Machine Learning Foundations', hours: 14, difficulty: 3,
        topics: ['Regression & classification', 'Train/test split & cross-validation', 'scikit-learn workflow', 'Evaluation metrics'],
        resources: [
          { title: 'scikit-learn official tutorials', type: 'Reference' },
          { title: 'Google\u2019s Machine Learning Crash Course', type: 'Interactive course' }
        ],
        quiz: [
          { q: 'Classification predicts:', options: ['A continuous number', 'A discrete category/label', 'An image', 'A database schema'], answer: 1, explanation: 'Classification assigns inputs to discrete classes; regression predicts continuous values.' },
          { q: 'Cross-validation is used to:', options: ['Speed up training only', 'Get a more reliable estimate of model performance', 'Clean missing data', 'Replace test sets entirely'], answer: 1, explanation: 'Cross-validation averages performance across multiple train/test splits for reliability.' },
          { q: 'Accuracy alone can be misleading on:', options: ['Balanced datasets', 'Highly imbalanced datasets', 'Small clean datasets', 'Any regression task'], answer: 1, explanation: 'On imbalanced data, accuracy can look high while missing the minority class entirely.' },
          { q: 'A confusion matrix helps evaluate:', options: ['Regression error only', 'Classification performance across classes', 'Data loading speed', 'Feature scaling'], answer: 1, explanation: 'It breaks down true/false positives and negatives per class.' }
        ]
      },
      {
        id: 'ds-5', title: 'Feature Engineering & Model Tuning', hours: 10, difficulty: 3,
        topics: ['Feature scaling & encoding', 'Handling imbalanced data', 'Hyperparameter tuning', 'Bias-variance tradeoff'],
        resources: [
          { title: 'scikit-learn — preprocessing guide', type: 'Reference' },
          { title: 'Kaggle Learn — Feature Engineering', type: 'Interactive course' }
        ],
        quiz: [
          { q: 'One-hot encoding is used to convert:', options: ['Numbers into images', 'Categorical variables into numeric columns', 'Text into audio', 'Dates into strings'], answer: 1, explanation: 'One-hot encoding represents categories as binary indicator columns.' },
          { q: 'High variance / low bias models tend to:', options: ['Underfit the data', 'Overfit the training data', 'Ignore all features', 'Train instantly'], answer: 1, explanation: 'High-variance models fit training data closely, risking poor generalization.' },
          { q: 'Grid search is commonly used for:', options: ['Cleaning text', 'Searching hyperparameter combinations', 'Visualizing data', 'Loading CSV files'], answer: 1, explanation: 'Grid search systematically tries hyperparameter combinations to find the best setting.' },
          { q: 'Feature scaling (e.g. standardization) is especially important for:', options: ['Decision trees only', 'Distance-based models like k-NN or SVM', 'Any model regardless of type', 'Only image data'], answer: 1, explanation: 'Distance-based algorithms are sensitive to feature scale.' }
        ]
      },
      {
        id: 'ds-6', title: 'Intro to Deep Learning', hours: 14, difficulty: 4,
        topics: ['Neural network basics', 'Training with backpropagation', 'CNNs & RNNs overview', 'Using a DL framework (PyTorch/TensorFlow)'],
        resources: [
          { title: 'PyTorch official tutorials', type: 'Reference' },
          { title: 'fast.ai — Practical Deep Learning', type: 'Interactive course' }
        ],
        quiz: [
          { q: 'Backpropagation is used to:', options: ['Load training data', 'Compute gradients to update network weights', 'Visualize the network', 'Split train/test sets'], answer: 1, explanation: 'Backprop computes gradients of the loss w.r.t. weights via the chain rule.' },
          { q: 'CNNs (convolutional networks) are especially well-suited to:', options: ['Tabular spreadsheets', 'Image data', 'Sorting algorithms', 'Text-only tasks exclusively'], answer: 1, explanation: 'Convolutions exploit spatial structure, making CNNs strong for image data.' },
          { q: 'A loss function measures:', options: ['Training speed', 'How far predictions are from the true values', 'The number of layers', 'Disk usage'], answer: 1, explanation: 'The loss quantifies prediction error, guiding weight updates.' },
          { q: 'An epoch in training refers to:', options: ['One neuron firing', 'One full pass through the training dataset', 'One line of code', 'One test prediction'], answer: 1, explanation: 'An epoch is a complete pass through the training data.' }
        ]
      },
      {
        id: 'ds-7', title: 'Capstone: End-to-End ML Project', hours: 16, difficulty: 4,
        topics: ['Framing a real-world problem', 'Building a full pipeline', 'Model evaluation & iteration', 'Deploying/sharing a model or demo'],
        resources: [
          { title: 'Kaggle — competitions & datasets', type: 'Practice' },
          { title: 'Streamlit / Gradio docs — sharing ML demos', type: 'Reference' }
        ],
        quiz: [
          { q: 'A strong first step for a capstone ML project is:', options: ['Picking the fanciest model available', 'Clearly defining the problem and success metric', 'Skipping data exploration', 'Deploying before training'], answer: 1, explanation: 'Defining the problem and metric guides every downstream decision.' },
          { q: 'Iterating on a model typically involves:', options: ['Training once and stopping', 'Analyzing errors and refining features/model', 'Deleting the dataset', 'Ignoring evaluation metrics'], answer: 1, explanation: 'Good ML work is iterative: evaluate, diagnose errors, and refine.' },
          { q: 'Sharing a lightweight interactive demo helps because it:', options: ['Replaces the need for evaluation', 'Makes the project tangible for others to try', 'Guarantees higher accuracy', 'Removes the need for documentation'], answer: 1, explanation: 'A demo lets others directly experience and understand your model\u2019s value.' },
          { q: 'Documenting assumptions and limitations of a model is important because:', options: ['It is required by Python syntax', 'It helps others use the model responsibly', 'It increases model accuracy', 'It speeds up training'], answer: 1, explanation: 'Clear documentation of limitations supports responsible, informed use.' }
        ]
      }
    ]
  },
  {
    id: 'cyber',
    title: 'Cybersecurity',
    icon: 'ShieldCheck',
    tagline: 'From safe fundamentals to defending real systems.',
    diagnostic: [
      { q: 'What does the "C" in the CIA triad (security) stand for?', options: ['Control', 'Confidentiality', 'Compliance', 'Certification'], answer: 1 },
      { q: 'A firewall\u2019s primary job is to:', options: ['Encrypt files', 'Filter network traffic based on rules', 'Compile code', 'Back up databases'], answer: 1 },
      { q: 'Phishing is best described as:', options: ['A network protocol', 'A social-engineering attack tricking users into giving up info', 'A type of firewall', 'An encryption algorithm'], answer: 1 },
      { q: 'What is the purpose of hashing a password before storing it?', options: ['To make it load faster', 'To avoid storing the plaintext password', 'To compress the database', 'To encrypt network traffic'], answer: 1 },
      { q: 'What best describes a "vulnerability" in security terms?', options: ['A completed patch', 'A weakness that could be exploited', 'A firewall rule', 'A strong password'], answer: 1 },
      { q: 'What is the goal of penetration testing?', options: ['To break systems permanently', 'To find and report exploitable weaknesses under authorization', 'To write marketing content', 'To design UI'], answer: 1 }
    ],
    modules: [
      {
        id: 'cy-1', title: 'Security Foundations', hours: 8, difficulty: 1,
        topics: ['CIA triad & security principles', 'Common threat types', 'Password & authentication hygiene', 'Security mindset & ethics'],
        resources: [
          { title: 'OWASP — Top security concepts overview', type: 'Reference' },
          { title: 'TryHackMe — \u201cIntro to Cyber Security\u201d path', type: 'Interactive course' }
        ],
        quiz: [
          { q: 'The "Availability" part of the CIA triad ensures:', options: ['Data is secret', 'Data is accurate', 'Systems/data are accessible when needed', 'Passwords are hashed'], answer: 2, explanation: 'Availability means authorized users can access systems/data when needed.' },
          { q: 'Multi-factor authentication improves security by:', options: ['Removing the need for passwords entirely', 'Requiring more than one form of verification', 'Speeding up login', 'Encrypting the network'], answer: 1, explanation: 'MFA combines multiple verification factors, reducing risk from a single compromised credential.' },
          { q: 'Ethical hacking requires:', options: ['No permission needed', 'Explicit authorization from the system owner', 'Anonymity from the client', 'Ignoring scope agreements'], answer: 1, explanation: 'Authorized scope is what separates ethical hacking from illegal intrusion.' },
          { q: 'A "threat" in security terminology refers to:', options: ['A patched vulnerability', 'A potential cause of harm to a system', 'A firewall log', 'A strong password'], answer: 1, explanation: 'A threat is a potential danger that could exploit a vulnerability.' }
        ]
      },
      {
        id: 'cy-2', title: 'Networking Essentials', hours: 12, difficulty: 2,
        topics: ['TCP/IP & OSI model', 'Ports & protocols', 'DNS & routing basics', 'Packet analysis intro'],
        resources: [
          { title: 'Cisco Networking Academy — free intro courses', type: 'Interactive course' },
          { title: 'Wireshark official documentation', type: 'Reference' }
        ],
        quiz: [
          { q: 'DNS primarily translates:', options: ['IP addresses to MAC addresses', 'Domain names to IP addresses', 'Ports to protocols', 'Packets to bytes'], answer: 1, explanation: 'DNS resolves human-readable domain names into IP addresses.' },
          { q: 'TCP is described as a "connection-oriented" protocol because it:', options: ['Never checks delivery', 'Establishes a handshake and ensures reliable delivery', 'Only works over Wi-Fi', 'Encrypts all traffic by default'], answer: 1, explanation: 'TCP performs a handshake and guarantees ordered, reliable delivery.' },
          { q: 'Port 443 is conventionally used for:', options: ['Plain HTTP', 'HTTPS (encrypted web traffic)', 'DNS queries', 'Email sending'], answer: 1, explanation: 'Port 443 is the standard port for HTTPS.' },
          { q: 'A packet analyzer (e.g. Wireshark) is used to:', options: ['Design UI layouts', 'Inspect network traffic in detail', 'Write server code', 'Encrypt hard drives'], answer: 1, explanation: 'Packet analyzers capture and inspect traffic for troubleshooting or analysis.' }
        ]
      },
      {
        id: 'cy-3', title: 'Web Application Security', hours: 12, difficulty: 3,
        topics: ['OWASP Top 10 overview', 'SQL injection & XSS concepts', 'Secure authentication patterns', 'Input validation & sanitization'],
        resources: [
          { title: 'OWASP Top 10 (official project)', type: 'Reference' },
          { title: 'PortSwigger Web Security Academy', type: 'Interactive course' }
        ],
        quiz: [
          { q: 'SQL injection typically exploits:', options: ['Weak CSS', 'Unsanitized user input reaching a database query', 'Slow network speed', 'Missing images'], answer: 1, explanation: 'SQLi occurs when untrusted input is concatenated directly into queries.' },
          { q: 'Cross-Site Scripting (XSS) primarily lets an attacker:', options: ['Access a physical server', 'Inject malicious scripts that run in another user\u2019s browser', 'Change DNS records', 'Slow down a database'], answer: 1, explanation: 'XSS injects scripts that execute in victims\u2019 browsers, often stealing data.' },
          { q: 'Parameterized queries help prevent SQL injection by:', options: ['Encrypting the database', 'Separating query logic from user-supplied data', 'Hiding error messages', 'Disabling the database'], answer: 1, explanation: 'Parameterized queries treat input as data, not executable query code.' },
          { q: 'Input validation should generally happen:', options: ['Only on the client', 'On the server, regardless of client-side checks', 'Never, to save time', 'Only for numeric fields'], answer: 1, explanation: 'Client-side checks can be bypassed; server-side validation is essential.' }
        ]
      },
      {
        id: 'cy-4', title: 'Cryptography Basics', hours: 10, difficulty: 3,
        topics: ['Symmetric vs asymmetric encryption', 'Hashing & digital signatures', 'TLS/SSL overview', 'Key management basics'],
        resources: [
          { title: 'Crypto101 (free introductory book)', type: 'Book' },
          { title: 'Khan Academy — Cryptography', type: 'Interactive course' }
        ],
        quiz: [
          { q: 'Symmetric encryption uses:', options: ['Two different keys', 'The same key to encrypt and decrypt', 'No key at all', 'Only hashing'], answer: 1, explanation: 'Symmetric encryption uses one shared secret key for both operations.' },
          { q: 'A digital signature primarily provides:', options: ['Faster encryption', 'Authenticity and integrity verification', 'Data compression', 'Free storage'], answer: 1, explanation: 'Digital signatures let recipients verify who signed data and that it wasn\u2019t altered.' },
          { q: 'Hashing differs from encryption because it is:', options: ['Reversible with the right key', 'Generally a one-way function', 'Always faster', 'Only used for passwords'], answer: 1, explanation: 'A good hash function cannot practically be reversed to recover the original input.' },
          { q: 'TLS is primarily used to:', options: ['Compress files', 'Secure data in transit over a network', 'Manage user accounts', 'Format HTML'], answer: 1, explanation: 'TLS encrypts and authenticates data as it travels across a network.' }
        ]
      },
      {
        id: 'cy-5', title: 'Systems & Linux Security', hours: 10, difficulty: 3,
        topics: ['Linux CLI fundamentals', 'File permissions & users', 'Log analysis basics', 'Hardening a system'],
        resources: [
          { title: 'Linux Journey (free interactive guide)', type: 'Interactive course' },
          { title: 'OverTheWire — Bandit wargame', type: 'Practice' }
        ],
        quiz: [
          { q: 'In Linux, `chmod 700 file` grants:', options: ['Full access to everyone', 'Read/write/execute to owner only', 'Read-only to everyone', 'No access to anyone'], answer: 1, explanation: '700 gives the owner full rwx and removes all access for group/others.' },
          { q: 'Reviewing system logs is important mainly for:', options: ['Improving font rendering', 'Detecting suspicious activity or incidents', 'Speeding up boot time', 'Formatting disks'], answer: 1, explanation: 'Logs often contain the first evidence of intrusion or misconfiguration.' },
          { q: '"Hardening" a system generally means:', options: ['Adding more features', 'Reducing its attack surface and misconfigurations', 'Increasing its RAM', 'Changing its color scheme'], answer: 1, explanation: 'Hardening reduces exposure by disabling unneeded services and fixing misconfigurations.' },
          { q: 'The principle of least privilege means users/processes should have:', options: ['Full admin rights by default', 'Only the access they need to do their job', 'No access at all', 'Shared root passwords'], answer: 1, explanation: 'Least privilege limits potential damage from mistakes or compromise.' }
        ]
      },
      {
        id: 'cy-6', title: 'Threat Detection & Incident Response', hours: 12, difficulty: 4,
        topics: ['SOC & SIEM concepts', 'Detecting common attack patterns', 'Incident response lifecycle', 'Basic malware analysis awareness'],
        resources: [
          { title: 'MITRE ATT&CK framework', type: 'Reference' },
          { title: 'TryHackMe — SOC Level 1 path', type: 'Interactive course' }
        ],
        quiz: [
          { q: 'A SIEM system is primarily used to:', options: ['Design websites', 'Aggregate and correlate security logs/events', 'Compile source code', 'Manage payroll'], answer: 1, explanation: 'SIEM tools centralize and correlate logs to surface potential incidents.' },
          { q: 'The typical first phase of incident response is:', options: ['Eradication', 'Preparation', 'Recovery', 'Lessons learned'], answer: 1, explanation: 'Preparation (plans, tools, training) happens before an incident occurs.' },
          { q: 'The MITRE ATT&CK framework catalogs:', options: ['CSS frameworks', 'Real-world adversary tactics and techniques', 'Font pairings', 'Database schemas'], answer: 1, explanation: 'ATT&CK documents known attacker tactics, techniques, and procedures.' },
          { q: 'An "indicator of compromise" (IOC) is:', options: ['A UI design pattern', 'Evidence suggesting a system may be breached', 'A type of firewall', 'A password policy'], answer: 1, explanation: 'IOCs (e.g. unusual IPs, file hashes) hint that a compromise may have occurred.' }
        ]
      },
      {
        id: 'cy-7', title: 'Capstone: Security Assessment Project', hours: 16, difficulty: 4,
        topics: ['Scoping an authorized assessment', 'Reconnaissance & vulnerability scanning basics', 'Writing a findings report', 'Recommending remediations'],
        resources: [
          { title: 'TryHackMe / HackTheBox — practice labs (authorized)', type: 'Practice' },
          { title: 'OWASP Testing Guide', type: 'Reference' }
        ],
        quiz: [
          { q: 'Before any security assessment begins, you must have:', options: ['A fast internet connection', 'Explicit written authorization and defined scope', 'A large team', 'Access to zero-day exploits'], answer: 1, explanation: 'Authorization and scope are the legal and ethical foundation of any assessment.' },
          { q: 'A good findings report typically prioritizes issues by:', options: ['Alphabetical order', 'Risk/severity and potential impact', 'Discovery order only', 'Report length'], answer: 1, explanation: 'Prioritizing by risk helps stakeholders address the most dangerous issues first.' },
          { q: 'Remediation recommendations should be:', options: ['Vague, to allow flexibility', 'Specific and actionable', 'Optional to include', 'Written only in technical jargon'], answer: 1, explanation: 'Clear, actionable recommendations make it far easier for teams to fix issues.' },
          { q: 'Reconnaissance in an authorized assessment refers to:', options: ['Attacking without permission', 'Gathering information about the target within agreed scope', 'Deleting logs', 'Writing marketing copy'], answer: 1, explanation: 'Recon gathers information to inform later, still-authorized testing steps.' }
        ]
      }
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: 'CloudCog',
    tagline: 'From a single server to automated, scalable infrastructure.',
    diagnostic: [
      { q: 'What is a key benefit of cloud computing over on-premise servers?', options: ['No internet needed', 'On-demand, scalable resources', 'Guaranteed zero cost', 'No configuration required'], answer: 1 },
      { q: 'What does "IaaS" typically provide?', options: ['Finished applications only', 'Virtualized computing infrastructure', 'Only databases', 'Only DNS'], answer: 1 },
      { q: 'What is the purpose of a container (e.g. Docker)?', options: ['To encrypt files', 'To package an app with its dependencies for consistent runs', 'To design UI', 'To replace all databases'], answer: 1 },
      { q: 'What does CI/CD stand for?', options: ['Continuous Integration / Continuous Delivery or Deployment', 'Central Index / Central Database', 'Code Inspection / Code Debugging', 'Cloud Instance / Cloud Domain'], answer: 0 },
      { q: 'What is "Infrastructure as Code" (IaC)?', options: ['Writing app UI code', 'Managing infrastructure via versioned config files', 'A database query language', 'A CSS framework'], answer: 1 },
      { q: 'What does horizontal scaling mean?', options: ['Adding more RAM to one server', 'Adding more machines/instances to share load', 'Reducing server count', 'Changing the OS'], answer: 1 }
    ],
    modules: [
      {
        id: 'cl-1', title: 'Cloud Computing Foundations', hours: 8, difficulty: 1,
        topics: ['IaaS/PaaS/SaaS models', 'Core cloud services overview', 'Cloud pricing & regions', 'Shared responsibility model'],
        resources: [
          { title: 'AWS Cloud Practitioner Essentials (free)', type: 'Interactive course' },
          { title: 'Microsoft Learn — Azure Fundamentals', type: 'Interactive course' }
        ],
        quiz: [
          { q: 'SaaS (Software as a Service) means the provider manages:', options: ['Nothing at all', 'The entire application, so users just use it', 'Only hardware', 'Only the OS'], answer: 1, explanation: 'SaaS delivers a fully managed application to end users.' },
          { q: 'The "shared responsibility model" in cloud security means:', options: ['The provider handles everything', 'Security duties are split between provider and customer', 'The customer handles everything', 'There is no responsibility'], answer: 1, explanation: 'Cloud providers secure the underlying infrastructure; customers secure their configurations and data.' },
          { q: 'A cloud "region" typically refers to:', options: ['A pricing tier', 'A geographic area containing data centers', 'A type of database', 'A container format'], answer: 1, explanation: 'Regions are physical locations that host clusters of data centers.' },
          { q: 'On-demand elasticity means you can:', options: ['Only use fixed resources', 'Scale resources up or down as needed', 'Never change your plan', 'Only scale down'], answer: 1, explanation: 'Elasticity lets you provision more or fewer resources based on demand.' }
        ]
      },
      {
        id: 'cl-2', title: 'Linux & Command Line for Ops', hours: 10, difficulty: 2,
        topics: ['Shell scripting basics', 'Process & service management', 'Networking commands', 'SSH & remote access'],
        resources: [
          { title: 'Linux Journey (free interactive guide)', type: 'Interactive course' },
          { title: 'The Linux Command Line (free book)', type: 'Book' }
        ],
        quiz: [
          { q: 'SSH is primarily used to:', options: ['Style terminal output', 'Securely access a remote machine', 'Compress files', 'Manage DNS records'], answer: 1, explanation: 'SSH provides an encrypted channel to remotely administer machines.' },
          { q: 'A basic shell script typically starts with a shebang like:', options: ['<!DOCTYPE html>', '#!/bin/bash', '<script>', 'import os'], answer: 1, explanation: 'The shebang line tells the OS which interpreter to run the script with.' },
          { q: 'The `systemctl status` command (on systemd systems) is used to:', options: ['Install packages', 'Check the status of a service', 'Edit files', 'Change permissions'], answer: 1, explanation: 'It reports whether a service is running, stopped, or failed.' },
          { q: 'Piping (`|`) in a shell allows you to:', options: ['Run two unrelated programs in parallel only', 'Send the output of one command as input to another', 'Delete files safely', 'Compress a directory'], answer: 1, explanation: 'Pipes chain commands together, passing output as the next input.' }
        ]
      },
      {
        id: 'cl-3', title: 'Containers with Docker', hours: 12, difficulty: 3,
        topics: ['Images vs containers', 'Writing a Dockerfile', 'Docker Compose basics', 'Container networking & volumes'],
        resources: [
          { title: 'Docker official "Get Started" guide', type: 'Reference' },
          { title: 'Play with Docker (free sandbox)', type: 'Practice' }
        ],
        quiz: [
          { q: 'A Docker image is best described as:', options: ['A running process', 'A read-only template used to create containers', 'A network protocol', 'A cloud region'], answer: 1, explanation: 'Images are immutable templates; containers are running instances of them.' },
          { q: 'A Dockerfile is used to:', options: ['Style a webpage', 'Define steps to build a Docker image', 'Query a database', 'Configure DNS'], answer: 1, explanation: 'Dockerfiles script the steps to assemble a custom image.' },
          { q: 'Docker Compose is primarily used to:', options: ['Compile code', 'Define and run multi-container applications', 'Replace Git', 'Monitor CPU temperature'], answer: 1, explanation: 'Compose lets you define multiple related services in one config file.' },
          { q: 'A Docker volume is used to:', options: ['Increase image size only', 'Persist data outside a container\u2019s lifecycle', 'Style containers', 'Encrypt network traffic'], answer: 1, explanation: 'Volumes persist data beyond a single container\u2019s life.' }
        ]
      },
      {
        id: 'cl-4', title: 'CI/CD Pipelines', hours: 10, difficulty: 3,
        topics: ['Pipeline stages: build, test, deploy', 'GitHub Actions / GitLab CI basics', 'Automated testing in pipelines', 'Deployment strategies (blue-green, rolling)'],
        resources: [
          { title: 'GitHub Actions official documentation', type: 'Reference' },
          { title: 'GitLab CI/CD documentation', type: 'Reference' }
        ],
        quiz: [
          { q: 'A CI pipeline typically runs automatically when:', options: ['A developer manually emails the team', 'Code is pushed or a pull request is opened', 'The server reboots randomly', 'Once a year'], answer: 1, explanation: 'CI pipelines are usually triggered by version-control events like pushes or PRs.' },
          { q: 'A blue-green deployment strategy helps by:', options: ['Deleting the old version immediately', 'Running two environments to switch traffic with minimal downtime', 'Only working with one server', 'Skipping testing entirely'], answer: 1, explanation: 'Blue-green deployments let you switch traffic to a new version with a fast rollback path.' },
          { q: 'Running automated tests in a pipeline mainly helps:', options: ['Catch regressions before deployment', 'Slow down releases unnecessarily', 'Replace manual QA entirely', 'Reduce code readability'], answer: 0, explanation: 'Automated tests catch issues early, before they reach production.' },
          { q: 'Continuous Deployment differs from Continuous Delivery in that it:', options: ['Requires no tests', 'Automatically releases every passing change to production', 'Only builds, never deploys', 'Is unrelated to CI'], answer: 1, explanation: 'Continuous Deployment auto-releases to production; Continuous Delivery keeps it release-ready but may require a manual trigger.' }
        ]
      },
      {
        id: 'cl-5', title: 'Infrastructure as Code', hours: 12, difficulty: 4,
        topics: ['Terraform basics', 'Declarative vs imperative config', 'State management', 'Reusable modules'],
        resources: [
          { title: 'Terraform official "Get Started" tutorials', type: 'Reference' },
          { title: 'HashiCorp Learn — free IaC courses', type: 'Interactive course' }
        ],
        quiz: [
          { q: 'Declarative infrastructure config means you specify:', options: ['The exact steps to run in order', 'The desired end state, and the tool figures out how', 'Only manual clicks in a console', 'Nothing, it\u2019s automatic'], answer: 1, explanation: 'Declarative tools like Terraform take a desired state and reconcile infrastructure to match it.' },
          { q: 'Terraform "state" is used to:', options: ['Store your source code', 'Track what infrastructure currently exists and its config', 'Replace version control', 'Style your cloud console'], answer: 1, explanation: 'State tracks real-world resources so Terraform can compute the right changes.' },
          { q: 'A key benefit of Infrastructure as Code is:', options: ['Manual, undocumented changes', 'Repeatable, version-controlled infrastructure', 'Slower provisioning', 'No auditability'], answer: 1, explanation: 'IaC makes infrastructure changes repeatable, reviewable, and auditable like application code.' },
          { q: 'A reusable Terraform module is best used when:', options: ['You never repeat infrastructure patterns', 'The same infrastructure pattern is needed in multiple places', 'You want to avoid version control', 'You only manage one resource ever'], answer: 1, explanation: 'Modules let you package and reuse common infrastructure patterns.' }
        ]
      },
      {
        id: 'cl-6', title: 'Monitoring & Observability', hours: 10, difficulty: 4,
        topics: ['Metrics, logs & traces', 'Alerting basics', 'Dashboards (e.g. Grafana concepts)', 'SLIs, SLOs & SLAs'],
        resources: [
          { title: 'Prometheus official documentation', type: 'Reference' },
          { title: 'Grafana Labs — learning resources', type: 'Reference' }
        ],
        quiz: [
          { q: 'An SLO (Service Level Objective) is:', options: ['A legal contract with customers', 'An internal target for a service\u2019s reliability/performance', 'A type of firewall rule', 'A CSS breakpoint'], answer: 1, explanation: 'SLOs are internal reliability targets teams aim to meet.' },
          { q: 'The three pillars of observability are commonly described as:', options: ['HTML, CSS, JS', 'Metrics, logs, and traces', 'CPU, RAM, disk', 'Dev, staging, prod'], answer: 1, explanation: 'Metrics, logs, and traces together give a fuller picture of system behavior.' },
          { q: 'Good alerting aims to notify on-call engineers about:', options: ['Every minor fluctuation', 'Meaningful issues that need human action', 'Nothing, ever', 'Only successful deploys'], answer: 1, explanation: 'Effective alerts are actionable, reducing noise and alert fatigue.' },
          { q: 'A dashboard like Grafana is primarily used to:', options: ['Write backend code', 'Visualize metrics and system health over time', 'Manage DNS', 'Compile containers'], answer: 1, explanation: 'Dashboards visualize collected metrics for quick, ongoing insight.' }
        ]
      },
      {
        id: 'cl-7', title: 'Capstone: Automated Deployment Pipeline', hours: 16, difficulty: 4,
        topics: ['Designing an end-to-end pipeline', 'Containerizing & deploying an app', 'Automating infra with IaC', 'Adding monitoring & rollback'],
        resources: [
          { title: 'Cloud provider free-tier documentation (AWS/Azure/GCP)', type: 'Reference' },
          { title: 'GitHub — explore real CI/CD pipeline examples', type: 'Practice' }
        ],
        quiz: [
          { q: 'A robust deployment pipeline should include a way to:', options: ['Only deploy, never roll back', 'Roll back quickly if a deployment fails', 'Skip all testing', 'Manually SSH in for every release'], answer: 1, explanation: 'A fast, reliable rollback path is essential for safe automated deployments.' },
          { q: 'Combining containers, CI/CD, and IaC mainly achieves:', options: ['More manual work overall', 'Consistent, automated, repeatable delivery of infrastructure and code', 'Slower iteration', 'No need for monitoring'], answer: 1, explanation: 'Together they let teams ship changes repeatably and confidently.' },
          { q: 'Adding monitoring to a pipeline\u2019s deployed app helps you:', options: ['Detect issues after release', 'Avoid writing any tests', 'Replace CI entirely', 'Skip staging environments'], answer: 0, explanation: 'Monitoring surfaces real-world issues that testing alone may miss.' },
          { q: 'A capstone deployment project is best demoed by showing:', options: ['Only the final production URL', 'The full flow: commit \u2192 pipeline \u2192 deployment \u2192 monitoring', 'Just the Terraform files', 'Only the Docker image size'], answer: 1, explanation: 'Demonstrating the full flow shows the automation and reasoning behind it, not just the end result.' }
        ]
      }
    ]
  }
]

export const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

export function getDomain(domainId) {
  return DOMAINS.find((d) => d.id === domainId)
}
