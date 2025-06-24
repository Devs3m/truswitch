import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

selectedTab: 'commercial' | 'workplace' = 'commercial';


  switchTab(tab: 'commercial' | 'workplace') {
    this.selectedTab = tab;
  }

   isAccordionOpen: string = '';

  // toggleAccordion(id: string) {
  //   // Toggle logic: if clicked again, close it
  //   this.isAccordionOpen = this.isAccordionOpen === id ? null : id;
  // }

  toggleAccordion(id: string): void {
  this.isAccordionOpen = this.isAccordionOpen === id ? '' : id;
}

//

activeFaqTab: string = 'society';


societyFaq = [
  {
    question: 'Do I need to wait for Truswitch Electrician to Install the device?',
    answer: 'Yes, Truswitch Electrician ensures correct and safe installation of the device.'
  },
  {
    question: 'Can I have more than 1 Truswitch in the Switch/Metal box?',
    answer: 'Yes, but ensure proper spacing and circuit design for safety and compliance.'
  },
  {
    question: 'Can I install outside the building (in the common area)?',
    answer: 'Installation outdoors is possible with waterproof enclosures and IP-rated protection.'
  },
  {
    question: 'Is MCB mandatory?',
    answer: 'Yes, an MCB ensures protection against overload and short circuits. It’s highly recommended.'
  }
];

usersFaq = [
  {
    question: 'Do I need to wait for a TruSwitch electrician to install the device?',
    answer: 'No. TruSwitch can be installed by any licensed electrician using our easy-to-follow installation guide. There\'s no dependency on a specialized technician from our team.'
  },
  {
    question: 'Can I have more than one TruSwitch in a single switch/metal box?',
    answer: 'Yes. Multiple TruSwitch units can be installed within the same enclosure, provided there is adequate space and proper heat dissipation is ensured.'
  },
  {
    question: 'Can I install TruSwitch outside the building (in common areas)?',
    answer: 'Absolutely. TruSwitch is designed to operate safely in common areas such as parking zones or outdoor electrical enclosures, provided it is installed in a standard weather-protected switch box.'
  },
  {
    question: 'Is an MCB (Miniature Circuit Breaker) mandatory for installation?',
    answer: 'While not mandatory, we strongly recommend using an MCB for added protection against electrical faults and to ensure safer operations.'
  },
  {
    question: 'What is the warranty on the TruSwitch device?',
    answer: 'Each TruSwitch device comes with a 1-year standard warranty, covering manufacturing defects and device malfunctions under normal usage conditions.'
  },
  {
    question: 'Are there any limitations on the number of users or switches in a building?',
    answer: 'No. The system is fully scalable — you can add as many TruSwitch devices and registered users as needed, making it ideal for apartments, offices, and commercial spaces.'
  }
];

partnersFaq = [
  {
    question: 'Can TruSwitch work without internet? How does it get connected to the cloud in this case?',
    answer: 'Yes, TruSwitch can function in offline mode using device memory and time-based logic. Once internet connectivity resumes—either through the user’s mobile app or local Wi-Fi—the device syncs its data to the cloud automatically.'
  },
  {
    question: 'Do I need to restart the charging process after a power cut? Can it auto-restart?',
    answer: 'TruSwitch supports auto-restart. If a charging session is interrupted due to power failure, it will resume automatically once power is restored, based on the previously set session parameters.'
  },
  {
    question: 'How do I set different rates for tenants and owners?',
    answer: 'Society Admins can configure differential pricing through the TruSwitch admin panel on the mobile app. Categories like Owners, Tenants, and Guests can be assigned distinct rates as per your society’s policy.'
  },
  {
    question: 'What is the device replacement process?',
    answer: 'If your TruSwitch device is under warranty and found to be defective, we provide a free replacement. Outside warranty, replacements can be ordered through our support team or partner channels.'
  },
  {
    question: 'How do I find the TruSwitch admin of my society?',
    answer: 'In the mobile app, once you select your society during onboarding, the system automatically routes your access request to the registered Society Admin. You may also contact your facility manager for direct approval.'
  },
  {
    question: 'My access is disabled — what could be the reason? How do I re-enable it?',
    answer: 'Access may be disabled due to non-payment, expired approval, or admin restrictions. To re-enable access, clear any pending dues and request reactivation via the app or contact your society’s TruSwitch admin.'
  },
  {
    question: 'How does a user pay for charging usage?',
    answer: 'Payments are made directly through the TruSwitch mobile app, via integrated payment gateways. In commercial setups, users may also pay on-site to the property manager, depending on the configuration.'
  },
  {
    question: 'How do I set rates for users?',
    answer: 'Admins can define per-unit electricity rates through the app’s admin settings. These rates are applied automatically during each user’s charging session for transparent billing.'
  },
  {
    question: 'Can I have different rates for different users or customers?',
    answer: 'Yes. TruSwitch supports role-based pricing, allowing separate rates for owners, tenants, guests, or employees — configurable at the property admin level.'
  },
  {
    question: 'How do I bill my employees for their EV usage at the workplace?',
    answer: 'In workplace setups, admins can view individual usage reports and share them with employees or set up automated billing via the TruSwitch dashboard. Employees can pay through the app or other methods as defined by the employer.'
  }
];

}
