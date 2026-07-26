export const servicesData = [
    {
      id: 'passport',
      title: 'Passport (e-Passport)',
      category: 'Identity',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop',
      description: 'Guidelines for new e-Passport application and renewal in Bangladesh.',
      documents: [
        'National ID (NID) or Digital Birth Certificate',
        'Previous Passport (for renewal)',
        '3R Size Photo (if applicable)',
        'Utility Bill Copy (Electricity/Gas/Water)',
        'Student ID (for student category)'
      ],
      processingTime: 'Regular: 15 Working Days | Express: 7 Days',
      fee: '4,025 BDT (48 Pages - 5 Years) / 8,050 BDT (48 Pages - 10 Years)',
      eligibility: 'Bangladeshi Citizen by birth or legal citizenship.',
      officialWebsite: 'https://www.epassport.gov.bd',
      steps: [
        'Fill out the online application form.',
        'Pay the government fees online or via designated bank.',
        'Book an appointment at your local passport office.',
        'Complete biometric data capture at the office.',
        'Collect passport after delivery SMS.'
      ]
    },
    {
      id: 'nid',
      title: 'National ID (NID Card)',
      category: 'Identity',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600&auto=format&fit=crop',
      description: 'Apply for a new Smart NID card or correct existing NID information.',
      documents: [
        'Digital Birth Certificate (Online Verified)',
        'SSC / Educational Certificate',
        'Parents NID Cards Copy',
        'Citizenship Certificate (Nogor/Union)',
        'Utility Bill Copy'
      ],
      processingTime: '30 Working Days',
      fee: 'Free for new applicant | 230-345 BDT for correction',
      eligibility: 'Bangladeshi citizen aged 16 years or above.',
      officialWebsite: 'https://services.nidw.gov.bd',
      steps: [
        'Register on the NID Bangladesh official portal.',
        'Fill up the required field accurately.',
        'Upload required supporting documents.',
        'Visit local Election Commission office for biometric data.'
      ]
    },
    {
      id: 'birth-certificate',
      title: 'Birth Registration',
      category: 'Civil',
      image: 'https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?q=80&w=600&auto=format&fit=crop',
      description: 'Get online Birth Registration Certificate (BRC) or make corrections.',
      documents: [
        'EPI Vaccination Card / Hospital Clearance',
        'Parents Digital Birth Certificates',
        'Holding Tax Receipt of House'
      ],
      processingTime: '7 - 15 Days',
      fee: '50 BDT - 100 BDT',
      eligibility: 'Any individual born in Bangladesh.',
      officialWebsite: 'https://bdris.gov.bd',
      steps: [
        'Apply online via BDRIS portal.',
        'Print the generated application form.',
        'Submit form with required documents to local Ward Counselor / Union Parishad office.'
      ]
    },
    {
      id: 'driving-license',
      title: 'Driving License',
      category: 'Transport',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=600&auto=format&fit=crop',
      description: 'Complete guide to get Learner permit, pass BRTA exam, and get Smart Driving License.',
      documents: [
        'Medical Fitness Certificate from registered doctor',
        'NID / Birth Certificate Copy',
        'Minimum Class 8 Educational Pass Certificate',
        'Learner License Copy'
      ],
      processingTime: '3 - 6 Months (including exam period)',
      fee: 'Learner: 518 BDT | Smart Card: 4,427 BDT (Professional)',
      eligibility: 'Minimum age 18 for Non-Professional and 20 for Professional license.',
      officialWebsite: 'https://bsp.brta.gov.bd',
      steps: [
        'Register on BRTA Service Portal (BSP).',
        'Apply and get Learner Driving License.',
        'Attend driving test on assigned date.',
        'After passing, apply for Smart Card Driving License.'
      ]
    }
  ];