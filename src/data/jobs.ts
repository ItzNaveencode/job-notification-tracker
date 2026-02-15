import type { Job } from '../types/job'

const uniqueJobs: Job[] = [
    // 1. Amazon - SDE I
    {
        id: 'job-1',
        title: 'SDE I',
        company: 'Amazon',
        location: 'Bangalore',
        mode: 'Hybrid',
        experience: '0-2 years',
        salaryRange: '18-25 LPA',
        skills: ['Java', 'DynamoDB', 'AWS', 'Data Structures'],
        postedDaysAgo: 2,
        source: 'LinkedIn',
        applyUrl: 'https://www.amazon.jobs',
        description: 'Join the Amazon Payments team to build scalable transaction systems. You will deal with high concurrency and distributed systems daily. Ideal for candidates strong in DSA and Java.'
    },
    // 2. Amazon - SDE II
    {
        id: 'job-2',
        title: 'SDE II',
        company: 'Amazon',
        location: 'Hyderabad',
        mode: 'Onsite',
        experience: '3-5 years',
        salaryRange: '28-35 LPA',
        skills: ['C++', 'System Design', 'AWS', 'Microservices'],
        postedDaysAgo: 5,
        source: 'Naukri',
        applyUrl: 'https://www.amazon.jobs',
        description: 'Work on Amazon Prime Video infrastructure. We need an experienced engineer to optimize low-latency streaming protocols and backend services. Experience with C++ is a must.'
    },
    // 3. Flipkart - SDE 1
    {
        id: 'job-3',
        title: 'SDE 1',
        company: 'Flipkart',
        location: 'Bangalore',
        mode: 'Hybrid',
        experience: '1-3 years',
        salaryRange: '16-22 LPA',
        skills: ['Java', 'Spring Boot', 'Kafka', 'Redis'],
        postedDaysAgo: 1,
        source: 'Wellfound',
        applyUrl: 'https://www.flipkartcareers.com',
        description: 'Flipkart Supply Chain team is hiring. You will build robust microservices to handle millions of orders. Experience with event-driven architecture is highly valued.'
    },
    // 4. Flipkart - UI Engineer
    {
        id: 'job-4',
        title: 'UI Engineer',
        company: 'Flipkart',
        location: 'Bangalore',
        mode: 'Onsite',
        experience: '2-4 years',
        salaryRange: '14-20 LPA',
        skills: ['React', 'TypeScript', 'Webpack', 'Performance Optimization'],
        postedDaysAgo: 3,
        source: 'LinkedIn',
        applyUrl: 'https://www.flipkartcareers.com',
        description: 'Looking for a UI Engineer to revamp the Flipkart mobile web experience. You should be an expert in React and web performance metrics. Join us to impact 100M+ users.'
    },
    // 5. Swiggy - Backend
    {
        id: 'job-5',
        title: 'Backend Developer',
        company: 'Swiggy',
        location: 'Remote',
        mode: 'Remote',
        experience: '1-3 years',
        salaryRange: '15-22 LPA',
        skills: ['Go', 'GRPC', 'PostgreSQL', 'Kubernetes'],
        postedDaysAgo: 0,
        source: 'Instahyre',
        applyUrl: 'https://careers.swiggy.com',
        description: 'Swiggy Instamart is scaling fast. We need a Go developer to build high-throughput backend services. Remote-first culture for this specific team.'
    },
    // 6. Swiggy - Intern
    {
        id: 'job-6',
        title: 'SDE Intern',
        company: 'Swiggy',
        location: 'Bangalore',
        mode: 'Onsite',
        experience: 'Fresher',
        salaryRange: '₹30k-₹50k/month',
        skills: ['Java', 'SQL', 'Problem Solving'],
        postedDaysAgo: 4,
        source: 'LinkedIn',
        applyUrl: 'https://careers.swiggy.com',
        description: 'Internship opportunity for final year students. You will work on internal tools and dashboards. Great place to start your career with mentorship from senior engineers.'
    },
    // 7. Zomato - Android
    {
        id: 'job-7',
        title: 'Android Developer',
        company: 'Zomato',
        location: 'Gurgaon',
        mode: 'Hybrid',
        experience: '2-4 years',
        salaryRange: '12-18 LPA',
        skills: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Retrofit'],
        postedDaysAgo: 6,
        source: 'Naukri',
        applyUrl: 'https://www.zomato.com/careers',
        description: 'Build features for the Zomato consumer app. We are moving to Jetpack Compose and need someone who loves crafting beautiful native UIs.'
    },
    // 8. Zomato - Backend
    {
        id: 'job-8',
        title: 'SDE 1',
        company: 'Zomato',
        location: 'Gurgaon',
        mode: 'Onsite',
        experience: '0-2 years',
        salaryRange: '14-20 LPA',
        skills: ['Python', 'Django', 'MySQL'],
        postedDaysAgo: 2,
        source: 'Fuel',
        applyUrl: 'https://www.zomato.com/careers',
        description: 'SDE 1 role for the Zomato Ordering team. You will write clean, efficient Python code and manage databases. Fast-paced environment.'
    },
    // 9. Uber - SDE 1
    {
        id: 'job-9',
        title: 'SDE 1',
        company: 'Uber',
        location: 'Bangalore',
        mode: 'Hybrid',
        experience: '1-3 years',
        salaryRange: '25-35 LPA',
        skills: ['Go', 'Microservices', 'Distributed Systems'],
        postedDaysAgo: 8,
        source: 'LinkedIn',
        applyUrl: 'https://www.uber.com/in/en/careers',
        description: 'Uber Engineering is hiring for the Rider Experience team. Solve complex geospatial problems and high-scale system challenges using Go.'
    },
    // 10. Uber - Data Eng
    {
        id: 'job-10',
        title: 'Data Engineer',
        company: 'Uber',
        location: 'Hyderabad',
        mode: 'Hybrid',
        experience: '2-5 years',
        salaryRange: '18-26 LPA',
        skills: ['Spark', 'Hadoop', 'Python', 'SQL'],
        postedDaysAgo: 5,
        source: 'Naukri',
        applyUrl: 'https://www.uber.com/in/en/careers',
        description: 'Manage petabytes of data at Uber. You will build ETL pipelines and data warehouses to support our analytics teams. Big Data experience required.'
    },
    // 11. Google - SWE III
    {
        id: 'job-11',
        title: 'Software Engineer III',
        company: 'Google',
        location: 'Bangalore',
        mode: 'Hybrid',
        experience: '4-7 years',
        salaryRange: '30-45 LPA',
        skills: ['C++', 'Python', 'System Design', 'Algorithms'],
        postedDaysAgo: 9,
        source: 'LinkedIn',
        applyUrl: 'https://careers.google.com',
        description: 'Join Google Cloud team in Bangalore. We are looking for versatile engineers who can tackle full-stack problems. C++ or Java expertise preferred.'
    },
    // 12. Google - Test Eng
    {
        id: 'job-12',
        title: 'Test Engineer',
        company: 'Google',
        location: 'Hyderabad',
        mode: 'Onsite',
        experience: '2-4 years',
        salaryRange: '12-18 LPA',
        skills: ['Python', 'Selenium', 'Automation', 'Espresso'],
        postedDaysAgo: 3,
        source: 'Fuel',
        applyUrl: 'https://careers.google.com',
        description: 'Ensure the quality of Google Search products. You will write automated test scripts and frameworks. Python scripting skills are essential.'
    },
    // 13. Microsoft - SDE 2
    {
        id: 'job-13',
        title: 'SDE 2',
        company: 'Microsoft',
        location: 'Noida',
        mode: 'Hybrid',
        experience: '3-6 years',
        salaryRange: '22-30 LPA',
        skills: ['C#', '.NET Core', 'Azure', 'CosmosDB'],
        postedDaysAgo: 4,
        source: 'Naukri',
        applyUrl: 'https://careers.microsoft.com',
        description: 'Microsoft Teams is expanding in Noida. We need strong backend engineers with C# and Azure experience to build real-time collaboration features.'
    },
    // 14. Microsoft - Support
    {
        id: 'job-14',
        title: 'Support Engineer',
        company: 'Microsoft',
        location: 'Bangalore',
        mode: 'Onsite',
        experience: '1-3 years',
        salaryRange: '8-12 LPA',
        skills: ['Azure', 'Networking', 'Polly', 'Troubleshooting'],
        postedDaysAgo: 1,
        source: 'LinkedIn',
        applyUrl: 'https://careers.microsoft.com',
        description: 'Join the Azure Support team. You will help enterprise customers resolve critical infrastructure issues. Strong networking knowledge required.'
    },
    // 15. Atlassian - Java
    {
        id: 'job-15',
        title: 'Java Developer',
        company: 'Atlassian',
        location: 'Bangalore',
        mode: 'Hybrid',
        experience: '2-5 years',
        salaryRange: '20-28 LPA',
        skills: ['Java', 'Spring', 'Rest API', 'AWS'],
        postedDaysAgo: 6,
        source: 'Instahyre',
        applyUrl: 'https://www.atlassian.com/company/careers',
        description: 'Work on Jira or Confluence backend. We value clean code and developer autonomy. You will own your features from design to deployment.'
    },
    // 16. Atlassian - Frontend
    {
        id: 'job-16',
        title: 'Frontend Engineer',
        company: 'Atlassian',
        location: 'Remote',
        mode: 'Remote',
        experience: '2-4 years',
        salaryRange: '18-25 LPA',
        skills: ['React', 'Redux', 'Atlaskit', 'CSS-in-JS'],
        postedDaysAgo: 0,
        source: 'Wellfound',
        applyUrl: 'https://www.atlassian.com/company/careers',
        description: 'Remote frontend role for our Growth team. You will run A/B tests and optimize user funnels. Mastery of React is expected.'
    },
    // 17. Salesforce - MTS
    {
        id: 'job-17',
        title: 'MTS',
        company: 'Salesforce',
        location: 'Hyderabad',
        mode: 'Hybrid',
        experience: '1-3 years',
        salaryRange: '22-28 LPA',
        skills: ['Java', 'Apex', 'LWC', 'JavaScript'],
        postedDaysAgo: 2,
        source: 'LinkedIn',
        applyUrl: 'https://salesforce.com/company/careers',
        description: 'Member of Technical Staff role. You will work on the core CRM platform. Good understanding of OOPs and database concepts required.'
    },
    // 18. Salesforce - Sr MTS
    {
        id: 'job-18',
        title: 'Senior MTS',
        company: 'Salesforce',
        location: 'Bangalore',
        mode: 'Onsite',
        experience: '5-8 years',
        salaryRange: '35-45 LPA',
        skills: ['Java', 'Distributed Systems', 'Oracle', 'Performance Tuning'],
        postedDaysAgo: 7,
        source: 'Naukri',
        applyUrl: 'https://salesforce.com/company/careers',
        description: 'Senior engineer needed for the Einstein AI team. You will build scalable data pipelines and integrate ML models into the CRM.'
    },
    // 19. Oracle - OCI
    {
        id: 'job-19',
        title: 'Member Tech Staff',
        company: 'Oracle',
        location: 'Bangalore',
        mode: 'Hybrid',
        experience: '0-2 years',
        salaryRange: '14-20 LPA',
        skills: ['Java', 'Cloud', 'Docker', 'Kubernetes'],
        postedDaysAgo: 3,
        source: 'Fuel',
        applyUrl: 'https://www.oracle.com/careers',
        description: 'Oracle Cloud Infrastructure (OCI) is hiring. Join us to build the next gen cloud platform. Strong Java and systems programming skills needed.'
    },
    // 20. Oracle - Apps
    {
        id: 'job-20',
        title: 'Java Developer',
        company: 'Oracle',
        location: 'Hyderabad',
        mode: 'Onsite',
        experience: '1-3 years',
        salaryRange: '10-15 LPA',
        skills: ['Java', 'SQL', 'PL/SQL', 'Rest Services'],
        postedDaysAgo: 5,
        source: 'Naukri',
        applyUrl: 'https://www.oracle.com/careers',
        description: 'Work on Oracle Financials Cloud. We need a developer who understands enterprise applications and database design.'
    },
    // 21. Infosys - Systems Eng
    {
        id: 'job-21',
        title: 'Systems Engineer',
        company: 'Infosys',
        location: 'Mysore',
        mode: 'Onsite',
        experience: 'Fresher',
        salaryRange: '3.5-5 LPA',
        skills: ['Python', 'Java', 'Basics of SQL'],
        postedDaysAgo: 1,
        source: 'Naukri',
        applyUrl: 'https://www.infosys.com/careers',
        description: 'Entry level role for fresh graduates. Training provided at our Mysore campus. You will be assigned to a project after 3 months of training.'
    },
    // 22. Infosys - Senior SE
    {
        id: 'job-22',
        title: 'Senior Systems Engineer',
        company: 'Infosys',
        location: 'Pune',
        mode: 'Hybrid',
        experience: '2-4 years',
        salaryRange: '5-8 LPA',
        skills: ['Angular', 'Node.js', 'MongoDB'],
        postedDaysAgo: 4,
        source: 'LinkedIn',
        applyUrl: 'https://www.infosys.com/careers',
        description: 'Looking for a MEAN stack developer for a US banking client. You should have good communication skills and hands-on experience.'
    },
    // 23. TCS - Assistant
    {
        id: 'job-23',
        title: 'Assistant System Eng',
        company: 'TCS',
        location: 'Mumbai',
        mode: 'Onsite',
        experience: 'Fresher',
        salaryRange: '3.3-4.5 LPA',
        skills: ['C', 'Java', 'Aptitude'],
        postedDaysAgo: 2,
        source: 'Naukri',
        applyUrl: 'https://www.tcs.com/careers',
        description: 'TCS Ninja hiring. Bulk hiring for freshers. Good logical reasoning and basic coding skills required. Rotational shifts possible.'
    },
    // 24. TCS - Digital
    {
        id: 'job-24',
        title: 'Digital Cadre',
        company: 'TCS',
        location: 'Bangalore',
        mode: 'Hybrid',
        experience: '1-3 years',
        salaryRange: '7-9 LPA',
        skills: ['Machine Learning', 'Python', 'Tensorflow'],
        postedDaysAgo: 6,
        source: 'Fuel',
        applyUrl: 'https://www.tcs.com/careers',
        description: 'TCS Digital hiring for innovation labs. We are looking for candidates with strong ML/AI background for POC development.'
    },
    // 25. Wipro - Project
    {
        id: 'job-25',
        title: 'Project Engineer',
        company: 'Wipro',
        location: 'Chennai',
        mode: 'Onsite',
        experience: 'Fresher',
        salaryRange: '3.5-5 LPA',
        skills: ['Java', '.NET', 'Testing'],
        postedDaysAgo: 3,
        source: 'Naukri',
        applyUrl: 'https://careers.wipro.com',
        description: 'Join Wipro as a Project Engineer. You will be trained in specific technologies based on business requirements. Bond applicable.'
    },
    // 26. Wipro - Java
    {
        id: 'job-26',
        title: 'Java Developer',
        company: 'Wipro',
        location: 'Hyderabad',
        mode: 'Hybrid',
        experience: '2-4 years',
        salaryRange: '5-8 LPA',
        skills: ['Java 8', 'Hibernate', 'Spring MVC'],
        postedDaysAgo: 5,
        source: 'LinkedIn',
        applyUrl: 'https://careers.wipro.com',
        description: 'Java developer needed for a retail client. Maintenance and enhancement of legacy applications. Stability and long term project.'
    },
    // 27. Accenture - ASE
    {
        id: 'job-27',
        title: 'App Dev Associate',
        company: 'Accenture',
        location: 'Gurgaon',
        mode: 'Hybrid',
        experience: '0-1 years',
        salaryRange: '4.5-6.5 LPA',
        skills: ['C++', 'Java', 'SQL'],
        postedDaysAgo: 0,
        source: 'Naukri',
        applyUrl: 'https://www.accenture.com/in-en/careers',
        description: 'Accenture is hiring for ASE role. You will contribute to development and testing of enterprise applications. Good learning curve.'
    },
    // 28. Accenture - Cloud
    {
        id: 'job-28',
        title: 'Cloud Analyst',
        company: 'Accenture',
        location: 'Bangalore',
        mode: 'Remote',
        experience: '2-4 years',
        salaryRange: '8-12 LPA',
        skills: ['AWS', 'Terraform', 'Jenkins'],
        postedDaysAgo: 2,
        source: 'Instahyre',
        applyUrl: 'https://www.accenture.com/in-en/careers',
        description: 'Join the Cloud First team. You will help migrate legacy apps to AWS. Certification in AWS is a big plus.'
    },
    // 29. Cognizant - Programmer
    {
        id: 'job-29',
        title: 'Programmer Analyst',
        company: 'Cognizant',
        location: 'Chennai',
        mode: 'Onsite',
        experience: '1-2 years',
        salaryRange: '4-6.5 LPA',
        skills: ['Java', 'J2EE', 'Oracle'],
        postedDaysAgo: 7,
        source: 'Naukri',
        applyUrl: 'https://careers.cognizant.com',
        description: 'Developer needed for healthcare client. You will work on backend logic and database queries. CTS standard benefits.'
    },
    // 30. Cognizant - GenC
    {
        id: 'job-30',
        title: 'GenC Next',
        company: 'Cognizant',
        location: 'Pune',
        mode: 'Hybrid',
        experience: '0-1 years',
        salaryRange: '6.5-8 LPA',
        skills: ['Python', 'Full Stack', 'Cloud Basics'],
        postedDaysAgo: 1,
        source: 'Fuel',
        applyUrl: 'https://careers.cognizant.com',
        description: 'GenC Next hiring for premium profiles. Looking for decent coding skills and ability to learn new stacks quickly.'
    },
    // 31. Capgemini - SAP
    {
        id: 'job-31',
        title: 'Senior Analyst',
        company: 'Capgemini',
        location: 'Mumbai',
        mode: 'Hybrid',
        experience: '3-5 years',
        salaryRange: '6-9 LPA',
        skills: ['SAP ABAP', 'SAP HANA'],
        postedDaysAgo: 4,
        source: 'LinkedIn',
        applyUrl: 'https://www.capgemini.com/in-en/careers',
        description: 'SAP ABAP consultant required. You should have experience in reports, interfaces, conversions, and enhancements.'
    },
    // 32. Capgemini - Tester
    {
        id: 'job-32',
        title: 'Software Engineer',
        company: 'Capgemini',
        location: 'Noida',
        mode: 'Onsite',
        experience: '1-3 years',
        salaryRange: '4-6 LPA',
        skills: ['Testing', 'Manual Testing', 'ALM'],
        postedDaysAgo: 2,
        source: 'Naukri',
        applyUrl: 'https://www.capgemini.com/in-en/careers',
        description: 'Manual tester needed for insurance project. You will execute test cases and report bugs in ALM. Immediate joiners preferred.'
    },
    // 33. IBM - Consultant
    {
        id: 'job-33',
        title: 'Consultant',
        company: 'IBM',
        location: 'Bangalore',
        mode: 'Hybrid',
        experience: '2-4 years',
        salaryRange: '6-9 LPA',
        skills: ['Salesforce', 'CRM', 'Apex'],
        postedDaysAgo: 5,
        source: 'LinkedIn',
        applyUrl: 'https://www.ibm.com/careers',
        description: 'IBM GBS is hiring Salesforce developers. You will customize SFDC and work on integrations. Good communication skills needed.'
    },
    // 34. IBM - Data Scientist
    {
        id: 'job-34',
        title: 'Data Scientist',
        company: 'IBM',
        location: 'Gurgaon',
        mode: 'Remote',
        experience: '3-6 years',
        salaryRange: '12-18 LPA',
        skills: ['Python', 'Pandas', 'Scikit-learn', 'NLP'],
        postedDaysAgo: 3,
        source: 'Instahyre',
        applyUrl: 'https://www.ibm.com/careers',
        description: 'Work on IBM Watson applications. We need a data scientist with strong NLP background. Remote possible for right candidate.'
    },
    // 35. Deloitte - Analyst
    {
        id: 'job-35',
        title: 'Analyst',
        company: 'Deloitte',
        location: 'Hyderabad',
        mode: 'Onsite',
        experience: '0-2 years',
        salaryRange: '6-8 LPA',
        skills: ['SQL', 'Tableau', 'Excel'],
        postedDaysAgo: 1,
        source: 'Naukri',
        applyUrl: 'https://jobs.deloitte.com',
        description: 'Deloitte USI (Risk Advisory) is hiring. You will analyze capabilities and create reports. SQL knowledge is mandatory.'
    },
    // 36. Deloitte - Solution
    {
        id: 'job-36',
        title: 'Solution Advisor',
        company: 'Deloitte',
        location: 'Bangalore',
        mode: 'Hybrid',
        experience: '2-4 years',
        salaryRange: '7-10 LPA',
        skills: ['Cybersecurity', 'IAM', 'SailPoint'],
        postedDaysAgo: 6,
        source: 'LinkedIn',
        applyUrl: 'https://jobs.deloitte.com',
        description: 'Cybersecurity professional needed for IAM projects. Experience with SailPoint or Okta is preferred. Shift allowance provided.'
    },
    // 37. Zoho - Backend
    {
        id: 'job-37',
        title: 'Member Tech Staff',
        company: 'Zoho',
        location: 'Chennai',
        mode: 'Onsite',
        experience: '1-3 years',
        salaryRange: '8-12 LPA',
        skills: ['Java', 'Struts', 'MySQL'],
        postedDaysAgo: 2,
        source: 'Zoho Careers',
        applyUrl: 'https://www.zoho.com/careers',
        description: 'Zoho Mail team is looking for backend engineers. We build everything in-house. Strong fundamentals in Java and algorithms required.'
    },
    // 38. Zoho - Creator
    {
        id: 'job-38',
        title: 'Software Dev',
        company: 'Zoho',
        location: 'Tenkasi',
        mode: 'Onsite',
        experience: '1-4 years',
        salaryRange: '6-9 LPA',
        skills: ['JavaScript', 'HTML/CSS', 'Deluge'],
        postedDaysAgo: 5,
        source: 'Zoho Careers',
        applyUrl: 'https://www.zoho.com/careers',
        description: 'Work from our beautiful Tenkasi office. You will build widgets for Zoho Creator. Great work-life balance.'
    },
    // 39. Freshworks - Rails
    {
        id: 'job-39',
        title: 'Senior SDE',
        company: 'Freshworks',
        location: 'Chennai',
        mode: 'Hybrid',
        experience: '4-7 years',
        salaryRange: '18-26 LPA',
        skills: ['Ruby on Rails', 'Ember.js', 'AWS'],
        postedDaysAgo: 1,
        source: 'Instahyre',
        applyUrl: 'https://www.freshworks.com/company/careers',
        description: 'Join the Freshdesk core team. We handle high traffic and complex workflows. Rails experience is highly preferred.'
    },
    // 40. Freshworks - Frontend
    {
        id: 'job-40',
        title: 'Frontend Eng',
        company: 'Freshworks',
        location: 'Bangalore',
        mode: 'Hybrid',
        experience: '1-3 years',
        salaryRange: '12-18 LPA',
        skills: ['React', 'Redux', 'HTML5'],
        postedDaysAgo: 0,
        source: 'LinkedIn',
        applyUrl: 'https://www.freshworks.com/company/careers',
        description: 'We are building a new design system. Need a UI engineer with an eye for detail and pixel-perfect implementation skills.'
    },
    // 41. Razorpay - Frontend
    {
        id: 'job-41',
        title: 'Frontend Guard',
        company: 'Razorpay',
        location: 'Bangalore',
        mode: 'Onsite',
        experience: '2-5 years',
        salaryRange: '20-28 LPA',
        skills: ['React', 'Performance', 'PWA'],
        postedDaysAgo: 3,
        source: 'Wellfound',
        applyUrl: 'https://razorpay.com/jobs',
        description: 'Work on the checkout experience. It must be blazing fast and reliable. You will obsess over millisecond latencies.'
    },
    // 42. Razorpay - Design
    {
        id: 'job-42',
        title: 'Product Designer',
        company: 'Razorpay',
        location: 'Bangalore',
        mode: 'Hybrid',
        experience: '2-4 years',
        salaryRange: '15-22 LPA',
        skills: ['Figma', 'UX Research', 'Prototyping'],
        postedDaysAgo: 6,
        source: 'LinkedIn',
        applyUrl: 'https://razorpay.com/jobs',
        description: 'Design financial products for businesses. We need someone who can simplify complex flows. Portfolio is mandatory.'
    },
    // 43. Cred - Backend
    {
        id: 'job-43',
        title: 'Backend Engineer',
        company: 'Cred',
        location: 'Bangalore',
        mode: 'Onsite',
        experience: '1-4 years',
        salaryRange: '25-35 LPA',
        skills: ['Java', 'Spring Boot', 'DynamoDB', 'AWS'],
        postedDaysAgo: 2,
        source: 'Instahyre',
        applyUrl: 'https://careers.cred.club',
        description: 'Join the high-performance team at CRED. We serve millions of creditworthy users. High bar for code quality and system design.'
    },
    // 44. Cred - QA
    {
        id: 'job-44',
        title: 'QA Automation',
        company: 'Cred',
        location: 'Bangalore',
        mode: 'Onsite',
        experience: '2-4 years',
        salaryRange: '12-18 LPA',
        skills: ['Appium', 'Selenium', 'Java', 'Mobile Testing'],
        postedDaysAgo: 5,
        source: 'Naukri',
        applyUrl: 'https://careers.cred.club',
        description: 'Automate mobile app testing for CRED. You will build frameworks to ensure 99.9% crash-free sessions. Mobile first experience required.'
    },
    // 45. Zerodha - Support
    {
        id: 'job-45',
        title: 'Tech Support',
        company: 'Zerodha',
        location: 'Bangalore',
        mode: 'Onsite',
        experience: '0-2 years',
        salaryRange: '4-6 LPA',
        skills: ['Trading', 'Communication', 'SQL Basics'],
        postedDaysAgo: 1,
        source: 'Zerodha Careers',
        applyUrl: 'https://zerodha.com/careers',
        description: 'Technical support for our trading platform Kite. You should understand stock markets and basic debugging. Intense but rewarding.'
    },
    // 46. Zerodha - Python
    {
        id: 'job-46',
        title: 'Python Dev',
        company: 'Zerodha',
        location: 'Bangalore',
        mode: 'Remote',
        experience: '2-5 years',
        salaryRange: '12-20 LPA',
        skills: ['Python', 'Go', 'Postgres', 'Redis'],
        postedDaysAgo: 8,
        source: 'Github',
        applyUrl: 'https://zerodha.com/careers',
        description: 'Work on our core order management system (OMS). We use Go and Python heavily. FOSS contributions are a massive plus.'
    },
    // 47. Groww - SDE
    {
        id: 'job-47',
        title: 'SDE 1',
        company: 'Groww',
        location: 'Bangalore',
        mode: 'Onsite',
        experience: '0-2 years',
        salaryRange: '16-24 LPA',
        skills: ['Java', 'Spring Boot', 'Microservices'],
        postedDaysAgo: 0,
        source: 'LinkedIn',
        applyUrl: 'https://groww.in/careers',
        description: 'Financial services simplified. We need fresh talent to build new investment products. Fintech experience is a bonus.'
    },
    // 48. Groww - Analyst
    {
        id: 'job-48',
        title: 'Data Analyst',
        company: 'Groww',
        location: 'Bangalore',
        mode: 'Hybrid',
        experience: '1-3 years',
        salaryRange: '8-14 LPA',
        skills: ['SQL', 'Python', 'Metabase'],
        postedDaysAgo: 4,
        source: 'Fuel',
        applyUrl: 'https://groww.in/careers',
        description: 'Analyze user behavior on the Groww app. You will work with product teams to drive growth. Strong SQL skills needed.'
    },
    // 49. PhonePe - Android
    {
        id: 'job-49',
        title: 'Android Eng',
        company: 'PhonePe',
        location: 'Pune',
        mode: 'Onsite',
        experience: '2-5 years',
        salaryRange: '18-26 LPA',
        skills: ['Kotlin', 'Android SDK', 'Dagger'],
        postedDaysAgo: 2,
        source: 'LinkedIn',
        applyUrl: 'https://www.phonepe.com/careers',
        description: 'PhonePe is India\'s leading payments app. We need an Android engineer scale the app to next 500M users. Pune office.'
    },
    // 50. PhonePe - Backend
    {
        id: 'job-50',
        title: 'SDE',
        company: 'PhonePe',
        location: 'Bangalore',
        mode: 'Hybrid',
        experience: '1-4 years',
        salaryRange: '20-30 LPA',
        skills: ['Java', 'Aerospike', 'HBase', 'Kafka'],
        postedDaysAgo: 5,
        source: 'Instahyre',
        applyUrl: 'https://www.phonepe.com/careers',
        description: 'Core platform team. You will work on the transaction engine processing thousands of TPS. Concurrency expertise needed.'
    },
    // 51. Paytm - Lead
    {
        id: 'job-51',
        title: 'Backend Lead',
        company: 'Paytm',
        location: 'Noida',
        mode: 'Onsite',
        experience: '6-9 years',
        salaryRange: '25-35 LPA',
        skills: ['Java', 'Scalability', 'Team Leading'],
        postedDaysAgo: 3,
        source: 'Naukri',
        applyUrl: 'https://paytm.com/careers',
        description: 'Lead a team of 5-8 engineers. You will own the payment gateway microservices. Prior leadership experience required.'
    },
    // 52. Paytm - Ops
    {
        id: 'job-52',
        title: 'Ops Engineer',
        company: 'Paytm',
        location: 'Noida',
        mode: 'Onsite',
        experience: '1-3 years',
        salaryRange: '5-8 LPA',
        skills: ['Linux', 'Shell Scripting', 'Monitoring'],
        postedDaysAgo: 4,
        source: 'Naukri',
        applyUrl: 'https://paytm.com/careers',
        description: 'Support Fastag operations. L2 support role involving log analysis and debugging production issues.'
    },
    // 53. Myntra - SDE
    {
        id: 'job-53',
        title: 'Software Eng',
        company: 'Myntra',
        location: 'Bangalore',
        mode: 'Hybrid',
        experience: '1-4 years',
        salaryRange: '18-24 LPA',
        skills: ['Java', 'ElasticSearch', 'Redis'],
        postedDaysAgo: 1,
        source: 'LinkedIn',
        applyUrl: 'https://careers.myntra.com',
        description: 'Fashion e-commerce leader. Work on the search and personalization engine. Experience with search technologies is a plus.'
    },
    // 54. Myntra - Data Science
    {
        id: 'job-54',
        title: 'Data Scientist',
        company: 'Myntra',
        location: 'Bangalore',
        mode: 'Hybrid',
        experience: '2-5 years',
        salaryRange: '20-30 LPA',
        skills: ['Python', 'Computer Vision', 'PyTorch'],
        postedDaysAgo: 7,
        source: 'LinkedIn',
        applyUrl: 'https://careers.myntra.com',
        description: 'Work on virtual try-on and fashion recommendation models. Computer vision expertise is highly desired.'
    },
    // 55. Jio - Developer
    {
        id: 'job-55',
        title: 'Developer',
        company: 'Jio',
        location: 'Mumbai',
        mode: 'Onsite',
        experience: '2-4 years',
        salaryRange: '6-10 LPA',
        skills: ['Angular', 'Java', 'Spring'],
        postedDaysAgo: 2,
        source: 'Naukri',
        applyUrl: 'https://careers.jio.com',
        description: 'Jio Platforms is hiring for MyJio app backend. You will integrate various services into the super-app ecosystem.'
    },
    // 56. Jio - Network
    {
        id: 'job-56',
        title: 'Network Eng',
        company: 'Jio',
        location: 'Navi Mumbai',
        mode: 'Onsite',
        experience: '1-3 years',
        salaryRange: '4-7 LPA',
        skills: ['CCNA', 'Routing', '5G Basics'],
        postedDaysAgo: 5,
        source: 'Naukri',
        applyUrl: 'https://careers.jio.com',
        description: '5G validation and testing. You will work in the lab testing new network equipment and protocols.'
    },
    // 57. Tata Elxsi - Embedded
    {
        id: 'job-57',
        title: 'Embedded Eng',
        company: 'Tata Elxsi',
        location: 'Trivandrum',
        mode: 'Onsite',
        experience: '2-4 years',
        salaryRange: '5-9 LPA',
        skills: ['C', 'Linux Internals', 'Automotive'],
        postedDaysAgo: 0,
        source: 'LinkedIn',
        applyUrl: 'https://www.tataelxsi.com/careers',
        description: 'Automotive embedded software development. Functional safety (ISO 26262) knowledge is preferred. C programming expert needed.'
    },
    // 58. Tata Elxsi - Validation
    {
        id: 'job-58',
        title: 'Validation Eng',
        company: 'Tata Elxsi',
        location: 'Bangalore',
        mode: 'Onsite',
        experience: '1-3 years',
        salaryRange: '4-8 LPA',
        skills: ['Python', 'Testing', 'HIL'],
        postedDaysAgo: 3,
        source: 'Fuel',
        applyUrl: 'https://www.tataelxsi.com/careers',
        description: 'Hardware In Loop (HIL) testing for ECUs. You will write python scripts to automate test benches.'
    },
    // 59. Mindtree - Lead
    {
        id: 'job-59',
        title: 'Module Lead',
        company: 'Mindtree',
        location: 'Bangalore',
        mode: 'Hybrid',
        experience: '4-7 years',
        salaryRange: '10-15 LPA',
        skills: ['Java', 'Microservices', 'Azure'],
        postedDaysAgo: 2,
        source: 'Naukri',
        applyUrl: 'https://www.mindtree.com/careers',
        description: 'Travel domain project. You will lead a small pod of developers. Client facing role with good visibility.'
    },
    // 60. LTI - Specialist
    {
        id: 'job-60',
        title: 'Specialist',
        company: 'LTI',
        location: 'Pune',
        mode: 'Hybrid',
        experience: '3-6 years',
        salaryRange: '8-12 LPA',
        skills: ['React', 'Node.js', 'MongoDB'],
        postedDaysAgo: 4,
        source: 'Instahyre',
        applyUrl: 'https://www.lntinfotech.com/careers',
        description: 'Full stack developer for manufacturing client. Dashboard creation and IoT data visualization. MERN stack.'
    }
]

export const JOBS = uniqueJobs
