"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  User,
  GraduationCap,
  Code,
  TestTube,
  Mail,
  Phone,
  MapPin,
  Download,
  Github,
  Linkedin,
  CheckCircle,
  Zap,
  Sun,
  Moon,
  Eye,
  X,
  FileText,
  Award,
  LocateIcon as Location,
} from "lucide-react";

// CV Data
const cvData = {
  personalInfo: {
    name: "Md. Mehedy Hasan Siam",
    email: "mehedisiam10@gmail.com",
    phone: "01793179626",
    linkedin: "in/md-mehedy-hasan-siam",
    github: "MehedyHasan10",
    website: "mehedyhasan10.github.io/siam.github.io",
    address: "Block-C, House No.31, Banasree, Dhaka",
  },
  summary:
    "QA Engineer with 2+ years of experience in manual and automated testing, ensuring the quality and reliability of web and software applications. Proficient in Selenium WebDriver, TestNG, and CI/CD integration, with expertise in test automation, functional testing, and detailed documentation. Skilled in identifying bugs, enhancing test coverage, and optimizing testing strategies to deliver high-quality products.",
  experience: [
    {
      title: "Junior QA Engineer",
      company: "Robi Axiata PLC (Vendor ESL)",
      period: "February 2025-July 2025",
      location: "Contractual,Shanta Forum, Dhaka",
      responsibilities: [
        "Designed and executed 200+ test cases and 5 project checklists, achieving 85% defect detection across the Software Testing Life Cycle (STLC).",
        "Tracked and resolved issues using Jira and Service Desk.",
        "Monitored database alerts, ensured backup health, and validated automated backups.",
        "Facilitated Agile ceremonies (sprint planning, reviews, stand-ups, retros) and collaborated with cross-functional teams.",
        "Improved UI/UX, contributing to a 15% increase in user retention.",
        "Working with developers, DevOps, and cross-functional teams to improve software quality.",
        "Monitored system performance and alerts using Dynatrace, My Robi, Robi Cash, Robi Alap, bdtickets, and IT360.",
      ],
    },
    {
      title: "QA Automation Engineer (Trainee)",
      company: "a1qa",
      period: "August 2024-December 2024",
      location: "Remote, Lakewood, Colorado",
      responsibilities: [
        "Developed and maintained automated test scripts for web applications using Java, Selenium WebDriver, TestNG, Aquality Selenium, and BDD principles.",
        "Participated in designing and executing manual and automated test cases for web-based projects.",
        "Utilized CI/CD pipelines to integrate automated tests, ensuring continuous testing during builds.",
        "Generated detailed test execution reports with Allure for enhanced result visualization and analysis.",
        "Used Docker for test environment management and BrowserStack for cross-browser compatibility testing.",
        "Performed API testing using Rest Assured to validate endpoints, request-response structures, and business logic.",
        "Conducted performance testing with JMeter to assess application responsiveness, scalability, and stability under load.",
        "Executed security testing to identify vulnerabilities, validate access controls, and ensure data protection.",
        "Performed database testing by executing SQL queries to verify data integrity, consistency, and backend processes.",
      ],
    },

    {
      title: "Junior Quality Control Engineer",
      company: "Quantanite Bangladesh Ltd.",
      period: "October 2023-July 2024",
      location: "Remote, Mirpur, Dhaka",
      responsibilities: [
        "Cleaned, organized, and analyzed large datasets to ensure high data quality and integrity.",
        "Performed quality control checks to ensure data met predefined accuracy and consistency standards.",
        "Identified and resolved data anomalies, contributing to improved project reliability and reporting accuracy.",
        "Collaborated with cross-functional teams to implement data validation strategies and maintain smooth workflow.",
      ],
    },
    {
      title: "SQA Engineer (Intern)",
      company: "Dream71 Bangladesh Ltd.",
      period: "June 2023-October 2023",
      location: "On-Site, Bashundhara, Dhaka",
      responsibilities: [
        "Conducted Unit, Integration, and System Testing, including Design Verification, Non-Functional, and Regression Testing.",
        "Conducted API testing with Postman API and Web Debugging with Charles and Fiddler.",
        "Executed Cross-Browser Testing to identify GUI and Functional Bugs.",
        "Reported bugs using Jira and wrote various test documentation such as Checklists, Acceptance Sheets, Test Data, and Test Cases.",
        "Prepared quality reports tailored to target audiences and selected testing criteria through surveys.",
        "Participated in daily Scrum meetings to ensure effective communication and progress tracking.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science, Computer Science & Engineering",
      institution: "American International University Bangladesh, Dhaka",
      grade: "CGPA: 3.58",
      year: "Passing year: 2023",
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Sirajganj Govt College, Sirajganj",
      grade: "GPA: 4.50",
      year: "Passing year: 2017",
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "B.L Govt High School, Sirajganj",
      grade: "GPA: 5.00",
      year: "Passing year: 2015",
    },
  ],
  skills:
    "Selenium WebDriver, Aquality Selenium, TestNG, Gherkin, Jenkins, Allure, BrowserStack, DDT, Postman, JMeter, Jira, Git, Postman, Java, Docker, SQL",
  certificates: [
    "API Fundamentals Student Expert - Postman",
    "QA Automation Testing - a1qa",
    "Big Data and Hadoop",
    "Database for developers-Foundation Oracle",
  ],
  achievement:
    "Reported a critical bug in the Telegram Android app where incoming calls continued ringing if data was turned off mid-ring; submitted a detailed bug report and video demonstration, which was officially acknowledged by the Telegram team.",
};

// CV Modal Component
function CVModal({ isOpen, onClose, isDarkMode }) {
  const downloadCV = () => {
    // Dynamic import for jsPDF to avoid SSR issues
    import("jspdf")
      .then(({ jsPDF }) => {
        const doc = new jsPDF();

        // Set font
        doc.setFont("helvetica");

        let yPosition = 15;
        const pageWidth = doc.internal.pageSize.width;
        const margin = 15;
        const maxWidth = pageWidth - margin * 2;

        // Summary at the top (as in your CV)
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        const summaryText =
          "QA Engineer with 2+ years of experience in manual and automated testing, ensuring the quality and reliability of web and software applications. Proficient in Selenium WebDriver, TestNG, and CI/CD integration, with expertise in test automation, functional testing, and detailed documentation. Skilled in identifying bugs, enhancing test coverage, and optimizing testing strategies to deliver high-quality products.";
        const summaryLines = doc.splitTextToSize(summaryText, maxWidth);
        doc.text(summaryLines, margin, yPosition);
        yPosition += summaryLines.length * 4 + 8;

        // Header - Name (larger and bold)
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Md. Mehedy Hasan Siam", margin, yPosition);
        yPosition += 8;

        // Contact Info (smaller font)
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.text("mehedisiam10@gmail.com", margin, yPosition);
        yPosition += 4;
        doc.text("01793179626", margin, yPosition);
        yPosition += 4;
        doc.text("Block-C, House No.31, Banasree, Dhaka", margin, yPosition);
        yPosition += 4;
        doc.text("in/md-mehedy-hasan-siam", margin, yPosition);
        yPosition += 4;
        doc.text("MehedyHasan10", margin, yPosition);
        yPosition += 4;
        doc.text("mehedy-siam.vercel.app", margin, yPosition);
        yPosition += 10;

        // SUMMARY Section Header
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("SUMMARY", margin, yPosition);
        yPosition += 10;

        // EXPERIENCE Section Header
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("EXPERIENCE", margin, yPosition);
        yPosition += 8;

        // Junior QA Engineer (Current - First)
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text("Junior QA Engineer", margin, yPosition);
        yPosition += 5;

        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text("Robi Axiata PLC (Vendor ESL)", margin, yPosition);
        yPosition += 5;

        doc.setFont("helvetica", "normal");
        doc.text(
          "February 2025- July 2025, Contractual, Shanta Forum, Dhaka",
          margin,
          yPosition
        );
        yPosition += 6;

        // Responsibilities for Robi
        const robiResponsibilities = [
          "Designed and executed 200+ test cases and 5 project checklists, achieving 85% defect detection across the Software Testing Life Cycle (STLC).",
          "Tracked and resolved issues using Jira and Service Desk.",
          "Monitored database alerts, ensured backup health, and validated automated backups.",
          "Facilitated Agile ceremonies (sprint planning, reviews, stand-ups, retros) and collaborated with cross-functional teams.",
          "Improved UI/UX, contributing to a 15% increase in user retention.",
          "Working with developers, DevOps, and cross-functional teams to improve software quality.",
          "Monitored system performance and alerts using Dynatrace, My Robi, Robi Cash, Robi Alap, bdtickets, and IT360.",
        ];

        robiResponsibilities.forEach((resp) => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
          const respLines = doc.splitTextToSize(resp, maxWidth - 5);
          doc.text(respLines, margin, yPosition);
          yPosition += respLines.length * 4 + 2;
        });
        yPosition += 5;

        // QA Automation Engineer (Trainee)
        if (yPosition > 240) {
          doc.addPage();
          yPosition = 20;
        }

        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text("QA Automation Engineer (Trainee)", margin, yPosition);
        yPosition += 5;

        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text("a1qa", margin, yPosition);
        yPosition += 5;

        doc.setFont("helvetica", "normal");
        doc.text(
          "August 2024-December 2024, Remote, Lakewood, Colorado",
          margin,
          yPosition
        );
        yPosition += 6;

        // Responsibilities for a1qa
        const a1qaResponsibilities = [
          "Developed and maintained automated test scripts for web applications using Java, Selenium WebDriver, TestNG, Aquality Selenium, and BDD principles.",
          "Participated in designing and executing manual and automated test cases for web-based projects.",
          "Utilized CI/CD pipelines to integrate automated tests, ensuring continuous testing during builds.",
          "Generated detailed test execution reports with Allure for enhanced result visualization and analysis.",
          "Used Docker for test environment management and BrowserStack for cross-browser compatibility testing.",
          "Performed API testing using Rest Assured to validate endpoints, request-response structures, and business logic.",
          "Conducted performance testing with JMeter to assess application responsiveness, scalability, and stability under load.",
          "Executed security testing to identify vulnerabilities, validate access controls, and ensure data protection.",
          "Performed database testing by executing SQL queries to verify data integrity, consistency, and backend processes.",
        ];

        a1qaResponsibilities.forEach((resp) => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
          const respLines = doc.splitTextToSize(resp, maxWidth - 5);
          doc.text(respLines, margin, yPosition);
          yPosition += respLines.length * 4 + 2;
        });
        yPosition += 5;

        // SQA Engineer (Intern)
        if (yPosition > 240) {
          doc.addPage();
          yPosition = 20;
        }

        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text("SQA Engineer (Intern)", margin, yPosition);
        yPosition += 5;

        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text("Dream71 Bangladesh Ltd.", margin, yPosition);
        yPosition += 5;

        doc.setFont("helvetica", "normal");
        doc.text(
          "June 2023-October 2023, On-Site, Bashundhara, Dhaka",
          margin,
          yPosition
        );
        yPosition += 6;

        // Responsibilities for Dream71
        const dream71Responsibilities = [
          "Conducted Unit, Integration, and System Testing, including Design Verification, Non-Functional, and Regression Testing.",
          "Conducted API testing with Postman API and Web Debugging with Charles and Fiddler.",
          "Executed Cross-Browser Testing to identify GUI and Functional Bugs.",
          "Reported bugs using Jira and wrote various test documentation such as Checklists, Acceptance Sheets, Test Data, and Test Cases.",
          "Prepared quality reports tailored to target audiences and selected testing criteria through surveys.",
          "Participated in daily Scrum meetings to ensure effective communication and progress tracking.",
        ];

        dream71Responsibilities.forEach((resp) => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
          const respLines = doc.splitTextToSize(resp, maxWidth - 5);
          doc.text(respLines, margin, yPosition);
          yPosition += respLines.length * 4 + 2;
        });
        yPosition += 5;

        // // Address
        // if (yPosition > 260) {
        //   doc.addPage()
        //   yPosition = 20
        // }

        // doc.setFontSize(10)
        // doc.setFont("helvetica", "normal")
        // doc.text("Block-C, House No.31, Banasree, Dhaka", margin, yPosition)
        // yPosition += 10

        // ACHIEVEMENT Section
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("ACHIEVEMENT", margin, yPosition);
        yPosition += 8;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        const achievementText =
          "Reported a critical bug in the Telegram Android app where incoming calls continued ringing if data was turned off mid-ring; submitted a detailed bug report and video demonstration, which was officially acknowledged by the Telegram team.";
        const achievementLines = doc.splitTextToSize(achievementText, maxWidth);
        doc.text(achievementLines, margin, yPosition);
        yPosition += achievementLines.length * 4 + 10;

        // EDUCATION Section
        if (yPosition > 200) {
          doc.addPage();
          yPosition = 20;
        }

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("EDUCATION", margin, yPosition);
        yPosition += 8;

        // Education entries
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(
          "Bachelor of Science, Computer Science & Engineering",
          margin,
          yPosition
        );
        yPosition += 5;
        doc.text(
          "American International University Bangladesh, Dhaka • CGPA: 3.58 • Passing year: 2023",
          margin,
          yPosition
        );
        yPosition += 8;

        doc.text("Higher Secondary Certificate (HSC)", margin, yPosition);
        yPosition += 5;
        doc.text(
          "Sirajganj Govt College, Sirajganj • GPA: 4.50 • Passing year: 2017",
          margin,
          yPosition
        );
        yPosition += 8;

        doc.text("Secondary School Certificate (SSC)", margin, yPosition);
        yPosition += 5;
        doc.text(
          "B.L Govt High School, Sirajganj • GPA: 5.00 • Passing year: 2015",
          margin,
          yPosition
        );
        yPosition += 15;

        // TECHNICAL SKILLS Section
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("TECHNICAL SKILLS", margin, yPosition);
        yPosition += 8;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        const skillsText =
          "Selenium WebDriver, Aquality Selenium, TestNG, Gherkin, Jenkins, Allure, BrowserStack, DDT, Postman, JMeter, Jira, Git, Postman, Java, Docker, SQL";
        const skillsLines = doc.splitTextToSize(skillsText, maxWidth);
        doc.text(skillsLines, margin, yPosition);
        yPosition += skillsLines.length * 4 + 10;

        // CERTIFICATE Section
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("CERTIFICATE", margin, yPosition);
        yPosition += 8;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(
          "API Fundamentals Student Expert - Postman",
          margin,
          yPosition
        );
        yPosition += 5;
        doc.text("QA Automation Testing - a1qa", margin, yPosition);
        yPosition += 5;
        doc.text("Big Data and Hadoop", margin, yPosition);
        yPosition += 5;
        doc.text(
          "Database for developers-Foundation Oracle",
          margin,
          yPosition
        );

        // Save the PDF
        doc.save("Md_Mehedy_Hasan_Siam_CV.pdf");
      })
      .catch((error) => {
        console.error("Error loading jsPDF:", error);
        // Fallback to text download with exact format
        const cvContent = `QA Engineer with 2+ years of experience in manual and automated testing, ensuring the quality and reliability of web and software applications. Proficient in Selenium WebDriver, TestNG, and CI/CD integration, with expertise in test automation, functional testing, and detailed documentation. Skilled in identifying bugs, enhancing test coverage, and optimizing testing strategies to deliver high-quality products.

Md. Mehedy Hasan Siam
mehedisiam10@gmail.com
01793179626
Block-C, House No.31, Banasree, Dhaka
in/md-mehedy-hasan-siam
MehedyHasan10
mehedy-siam.vercel.app

SUMMARY

EXPERIENCE

Junior QA Engineer
Robi Axiata PLC (Vendor ESL)
February 2025- July 2025, contractual, Shanta Forum, Dhaka
Designed and executed 200+ test cases and 5 project checklists, achieving 85% defect detection across the Software Testing Life Cycle (STLC).
Tracked and resolved issues using Jira and Service Desk.
Monitored database alerts, ensured backup health, and validated automated backups.
Facilitated Agile ceremonies (sprint planning, reviews, stand-ups, retros) and collaborated with cross-functional teams.
Improved UI/UX, contributing to a 15% increase in user retention.
Working with developers, DevOps, and cross-functional teams to improve software quality.
Monitored system performance and alerts using Dynatrace, My Robi, Robi Cash, Robi Alap, bdtickets, and IT360.

QA Automation Engineer (Trainee)
a1qa
August 2024-December 2024, Remote, Lakewood, Colorado
Developed and maintained automated test scripts for web applications using Java, Selenium WebDriver, TestNG, Aquality Selenium, and BDD principles.
Participated in designing and executing manual and automated test cases for web-based projects.
Utilized CI/CD pipelines to integrate automated tests, ensuring continuous testing during builds.
Generated detailed test execution reports with Allure for enhanced result visualization and analysis.
Used Docker for test environment management and BrowserStack for cross-browser compatibility testing.
Performed API testing using Rest Assured to validate endpoints, request-response structures, and business logic.
Conducted performance testing with JMeter to assess application responsiveness, scalability, and stability under load.
Executed security testing to identify vulnerabilities, validate access controls, and ensure data protection.
Performed database testing by executing SQL queries to verify data integrity, consistency, and backend processes.

Junior Quality Control Engineer
Quantanite Bangladesh Ltd.
October 2023-July 2024, Remote, Mirpur, Dhaha
Cleaned, organized, and analyzed large datasets to ensure high data quality and integrity.
Performed quality control checks to ensure data met predefined accuracy and consistency standards.
Identified and resolved data anomalies, contributing to improved project reliability and reporting accuracy.
Collaborated with cross-functional teams to implement data validation strategies and maintain smooth workflow.

SQA Engineer (Intern)
Dream71 Bangladesh Ltd.
June 2023-October 2023, Full time, Bashundhara, Dhaka
Conducted Unit, Integration, and System Testing, including Design Verification, Non-Functional, and Regression Testing.
Conducted API testing with Postman API and Web Debugging with Charles and Fiddler.
Executed Cross-Browser Testing to identify GUI and Functional Bugs.
Reported bugs using Jira and wrote various test documentation such as Checklists, Acceptance Sheets, Test Data, and Test Cases.
Prepared quality reports tailored to target audiences and selected testing criteria through surveys.
Participated in daily Scrum meetings to ensure effective communication and progress tracking.


ACHIEVEMENT
Reported a critical bug in the Telegram Android app where incoming calls continued ringing if data was turned off mid-ring; submitted a detailed bug report and video demonstration, which was officially acknowledged by the Telegram team.

EDUCATION
Bachelor of Science, Computer Science & Engineering
American International University Bangladesh, Dhaka • CGPA: 3.58 • Passing year: 2023

Higher Secondary Certificate (HSC)
Sirajganj Govt College, Sirajganj • GPA: 4.50 • Passing year: 2017

Secondary School Certificate (SSC)
B.L Govt High School, Sirajganj • GPA: 5.00 • Passing year: 2015

TECHNICAL SKILLS
Selenium WebDriver, Aquality Selenium, TestNG, Gherkin, Jenkins, Allure, BrowserStack, DDT, Postman, JMeter, Jira, Git, Postman, Java, Docker, SQL

CERTIFICATE
API Fundamentals Student Expert - Postman
QA Automation Testing - a1qa
Big Data and Hadoop
Database for developers-Foundation Oracle`;

        const blob = new Blob([cvContent], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Md_Mehedy_Hasan_Siam_CV.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className={`sticky top-0 z-10 p-6 border-b flex justify-between items-center ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold">My CV</h2>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={downloadCV}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className={
                  isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* CV Content */}
          <div className="p-6 space-y-8">
            {/* Personal Info */}
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">
                {cvData.personalInfo.name}
              </h1>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {cvData.personalInfo.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {cvData.personalInfo.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Linkedin className="w-4 h-4" />
                  {cvData.personalInfo.linkedin}
                </span>
                <span className="flex items-center gap-1">
                  <Github className="w-4 h-4" />
                  {cvData.personalInfo.github}
                </span>
              </div>
              <p className="mt-2 text-sm flex items-center justify-center gap-1">
                <Location className="w-4 h-4" />
                {cvData.personalInfo.address}
              </p>
            </div>

            {/* Summary */}
            <div>
              <h2 className="text-xl font-bold mb-3 text-blue-600">SUMMARY</h2>
              <p
                className={`leading-relaxed text-justify ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {cvData.summary}
              </p>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-blue-600">
                EXPERIENCE
              </h2>
              <div className="space-y-6">
                {cvData.experience.map((exp, index) => (
                  <div
                    key={index}
                    className={`border-l-4 border-blue-500 pl-4 ${
                      isDarkMode ? "border-opacity-70" : ""
                    }`}
                  >
                    <h3 className="text-lg font-semibold">{exp.title}</h3>
                    <p className="font-medium text-blue-600">{exp.company}</p>
                    <p
                      className={`text-sm mb-3 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {exp.period}, {exp.location}
                    </p>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((resp, idx) => (
                        <li
                          key={idx}
                          className={`text-sm leading-relaxed ${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          • {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-blue-600">
                EDUCATION
              </h2>
              <div className="space-y-4">
                {cvData.education.map((edu, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <GraduationCap className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {edu.institution} • {edu.grade} • {edu.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <h2 className="text-xl font-bold mb-3 text-blue-600">
                TECHNICAL SKILLS
              </h2>
              <p
                className={`leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {cvData.skills}
              </p>
            </div>

            {/* Certificates */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-blue-600">
                CERTIFICATES
              </h2>
              <div className="space-y-2">
                {cvData.certificates.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-blue-600" />
                    <span
                      className={`text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {cert}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievement */}
            <div>
              <h2 className="text-xl font-bold mb-3 text-blue-600">
                ACHIEVEMENT
              </h2>
              <p
                className={`leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {cvData.achievement}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Visitor Counter Component
function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate real-time updates
    const updateVisitorCount = () => {
      const stored = localStorage.getItem("portfolioVisitorCount");
      const lastUpdate = localStorage.getItem("portfolioLastUpdate");
      const now = Date.now();

      if (!stored) {
        // First time visitor
        const initialCount = Math.floor(Math.random() * 300) + 1500; // Start with 1500-1800
        localStorage.setItem("portfolioVisitorCount", initialCount.toString());
        localStorage.setItem("portfolioLastUpdate", now.toString());
        return initialCount;
      }

      const count = Number.parseInt(stored);
      const lastUpdateTime = Number.parseInt(lastUpdate || "0");

      // Update every 30 seconds to 2 minutes randomly
      const timeDiff = now - lastUpdateTime;
      const updateInterval = Math.random() * 90000 + 30000; // 30s to 2min

      if (timeDiff > updateInterval) {
        const increment = Math.floor(Math.random() * 3) + 1; // Add 1-3 views
        const newCount = count + increment;
        localStorage.setItem("portfolioVisitorCount", newCount.toString());
        localStorage.setItem("portfolioLastUpdate", now.toString());
        return newCount;
      }

      return count;
    };

    // Initial load
    setTimeout(() => {
      const count = updateVisitorCount();
      setIsLoading(false);

      // Animate counter
      let current = Math.max(0, count - 50);
      const increment = Math.ceil((count - current) / 30);
      const timer = setInterval(() => {
        current += increment;
        if (current >= count) {
          current = count;
          clearInterval(timer);
        }
        setVisitorCount(current);
      }, 50);

      return () => clearInterval(timer);
    }, 1000);

    // Set up real-time updates
    const interval = setInterval(() => {
      const newCount = updateVisitorCount();
      if (newCount > visitorCount) {
        setVisitorCount(newCount);
      }
    }, 45000); // Check every 45 seconds

    return () => clearInterval(interval);
  }, [visitorCount]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 2,
              }}
            >
              <Eye className="w-5 h-5" />
            </motion.div>
            <div>
              <p className="text-xs font-medium opacity-90">Portfolio Views</p>
              <motion.p
                className="text-lg font-bold"
                key={visitorCount}
                initial={{ scale: 1.2, color: "#fbbf24" }}
                animate={{ scale: 1, color: "#ffffff" }}
                transition={{ duration: 0.5 }}
              >
                {isLoading ? "..." : visitorCount.toLocaleString()}
              </motion.p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Contact Form Component
function ContactForm() {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      // Create mailto link
      const mailtoLink = `mailto:mehedisiam10@gmail.com?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `From: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      // Open email client
      window.location.href = mailtoLink;

      // Show success message
      setSubmitStatus("success");

      // Reset form after a delay
      setTimeout(() => {
        handleReset();
        setSubmitStatus("");
      }, 2000);
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error sending email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      email: "",
      subject: "",
      message: "",
    });
    setSubmitStatus("");
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
              placeholder="Project Discussion"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 resize-none"
              placeholder="Tell me about your project requirements..."
            />
          </div>

          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-lg text-center ${
                submitStatus === "success"
                  ? "bg-green-500/20 text-green-100 border border-green-400/30"
                  : "bg-red-500/20 text-red-100 border border-red-400/30"
              }`}
            >
              {submitStatus === "success"
                ? "✓ Email client opened! Message ready to send."
                : "✗ Something went wrong. Please try again."}
            </motion.div>
          )}

          <div className="flex space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-blue-600 hover:bg-white/90 font-semibold py-3 transition-all duration-300"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full mr-2"
                  />
                ) : (
                  <Mail className="w-4 h-4 mr-2" />
                )}
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="button"
                onClick={handleReset}
                variant="outline"
                className="px-6 py-3 bg-transparent border-white/30 text-white hover:bg-white/10 transition-all duration-300"
              >
                Reset
              </Button>
            </motion.div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // Function to scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "experience",
        "education",
        "skills",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest("header")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -10,
      boxShadow: isDarkMode
        ? "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
        : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
      },
    },
  };

  const experiences = [
    {
      title: "Junior QA Engineer",
      company: "Robi Axiata PLC (Vendor ESL)",
      period: "Feb 2025 - July 2025",
      type: "Contractual",
      description:
        "Leading quality assurance initiatives for mobile telecommunications services. Implementing comprehensive test automation frameworks, monitoring system performance with Dynatrace and Grafana, and managing test workflows through JIRA and Service Desk. Conducting API monitoring and performance testing to ensure optimal service reliability.",
      skills: [
        "JIRA",
        "Service Desk",
        "Test Case Design",
        "Dynatrace",
        "API Monitoring",
        "Grafana",
        "IP Monitoring",
        "Jenkins",
        "JMeter",
        "Performance Testing",
      ],
    },
    {
      title: "QA Automation Engineer",
      company: "a1qa",
      period: "Aug 2024 - Dec 2024",
      type: "Traniee",
      description:
        "Developed comprehensive automated test frameworks using Java and Selenium WebDriver. Implemented BDD approach with Cucumber and Gherkin for test scenarios. Built CI/CD pipelines with Docker integration, performed extensive API testing with RestAssured, and conducted cross-browser testing using BrowserStack. Generated detailed test reports with Allure and managed project workflows through Maven and JIRA.",
      skills: [
        "Java",
        "JMeter",
        "Cucumber",
        "CI/CD",
        "DDT",
        "Docker",
        "TestNG",
        "BDD",
        "Git",
        "RestAssured",
        "API Testing",
        "Selenium WebDriver",
        "Database Testing",
        "Gherkin",
        "BrowserStack",
        "Allure Report",
        "Maven",
        "JIRA",
      ],
    },
    {
      title: "Junior Quality Control Engineer",
      company: "Quantanite Bangladesh Ltd.",
      period: "Oct 2023 - Jul 2024",
      type: "Remote",
      description:
        "Conducted manual testing, created test cases, and ensured software quality standards across multiple projects.",
      skills: [
        "Manual Testing",
        "Test Case Design",
        "Quality Control",
        "Documentation",
      ],
    },
    {
      title: "SQA (Intern)",
      company: "Dream71 Bangladesh Ltd.",
      period: "Jun 2023 - Oct 2023",
      type: "Internship",
      description:
        "Assisted in testing web applications, learned QA methodologies, and contributed to quality improvement processes.",
      skills: [
        "Web Testing",
        "QA Methodologies",
        "Test Planning",
        "Defect Management",
      ],
    },
  ];

  const education = [
    {
      degree: "BSc in Computer Science & Engineering",
      institution: "American International University-Bangladesh",
      year: "2023",
      type: "University",
    },
    {
      degree: "Higher Secondary Certificate",
      institution: "Sirajganj Government College, Sirajganj",
      year: "2017",
      type: "College",
    },
    {
      degree: "Secondary School Certificate",
      institution: "B.L Government High School, Sirajganj",
      year: "2015",
      type: "School",
    },
  ];

  const skills = [
    {
      category: "QA Testing",
      items: [
        "Manual Testing",
        "Automated Testing",
        "API Testing",
        "Performance Testing",
        "Mobile Testing",
        "Test Case Design",
        "Database Testing",
        "Cross-browser Testing",
      ],
    },
    {
      category: "Automation Frameworks",
      items: [
        "Selenium WebDriver",
        "TestNG",
        "Cucumber",
        "BDD",
        "DDT",
        "Gherkin",
        "RestAssured",
      ],
    },
    {
      category: "Programming & Build Tools",
      items: ["Java", "JavaScript", "Python", "Maven", "SQL", "Node.js"],
    },
    {
      category: "CI/CD & DevOps",
      items: ["Jenkins", "Docker", "Git", "CI/CD Pipelines", "Version Control"],
    },
    {
      category: "Monitoring & Analytics",
      items: [
        "Dynatrace",
        "Grafana",
        "API Monitoring",
        "IP Monitoring",
        "Performance Monitoring",
        "JMeter",
      ],
    },
    {
      category: "Project Management & Reporting",
      items: [
        "JIRA",
        "Service Desk",
        "Allure Report",
        "TestRail",
        "BrowserStack",
        "Agile",
        "Scrum",
      ],
    },
  ];

  if (isLoading) {
    return (
      <div
        className={`h-screen w-screen flex items-center justify-center ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 to-blue-900"
            : "bg-gradient-to-br from-slate-50 to-blue-50"
        }`}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Number.POSITIVE_INFINITY,
          }}
          className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
        />
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`min-h-screen transition-colors duration-300 ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 to-blue-900"
            : "bg-gradient-to-br from-slate-50 to-blue-50"
        }`}
      >
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50"
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        />

        {/* Visitor Counter */}
        <VisitorCounter />

        {/* CV Modal */}
        <CVModal
          isOpen={isCVModalOpen}
          onClose={() => setIsCVModalOpen(false)}
          isDarkMode={isDarkMode}
        />

        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className={`backdrop-blur-md border-b sticky top-0 z-40 transition-colors duration-300 ${
            isDarkMode
              ? "bg-gray-900/80 border-gray-700"
              : "bg-white/80 border-gray-200"
          }`}
        >
          <div className="container mx-auto px-6 py-4">
            <nav className="flex justify-between items-center">
              <motion.h1
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("hero")}
              >
                Md. Mehedy Hasan Siam
              </motion.h1>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                {[
                  { id: "about", label: "About" },
                  { id: "experience", label: "Experience" },
                  { id: "education", label: "Education" },
                  { id: "skills", label: "Skills" },
                  { id: "contact", label: "Contact" },
                ].map((section) => (
                  <motion.button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`capitalize transition-colors ${
                      activeSection === section.id
                        ? "text-blue-600 font-semibold"
                        : isDarkMode
                        ? "text-gray-300 hover:text-blue-400"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {section.label}
                  </motion.button>
                ))}

                {/* Theme Toggle Button */}
                <motion.button
                  onClick={toggleTheme}
                  className={`p-2 rounded-full transition-colors ${
                    isDarkMode
                      ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={
                    isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                  }
                >
                  <motion.div
                    initial={false}
                    animate={{ rotate: isDarkMode ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isDarkMode ? (
                      <Sun className="w-5 h-5" />
                    ) : (
                      <Moon className="w-5 h-5" />
                    )}
                  </motion.div>
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center space-x-2">
                {/* Mobile Theme Toggle */}
                <motion.button
                  onClick={toggleTheme}
                  className={`p-2 rounded-full transition-colors ${
                    isDarkMode
                      ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    initial={false}
                    animate={{ rotate: isDarkMode ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isDarkMode ? (
                      <Sun className="w-4 h-4" />
                    ) : (
                      <Moon className="w-4 h-4" />
                    )}
                  </motion.div>
                </motion.button>

                <motion.button
                  className={`p-2 transition-colors ${
                    isDarkMode
                      ? "text-gray-300 hover:text-blue-400"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <motion.svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isMobileMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </motion.svg>
                </motion.button>
              </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`md:hidden mt-4 pb-4 border-t transition-colors ${
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    exit={{ y: -20 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="flex flex-col space-y-4 pt-4"
                  >
                    {[
                      { id: "about", label: "About" },
                      { id: "experience", label: "Experience" },
                      { id: "education", label: "Education" },
                      { id: "skills", label: "Skills" },
                      { id: "contact", label: "Contact" },
                    ].map((section, index) => (
                      <motion.button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`text-left py-2 px-4 rounded-lg transition-colors ${
                          activeSection === section.id
                            ? isDarkMode
                              ? "text-blue-400 font-semibold bg-blue-900/30"
                              : "text-blue-600 font-semibold bg-blue-50"
                            : isDarkMode
                            ? "text-gray-300 hover:text-blue-400 hover:bg-gray-800"
                            : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {section.label}
                      </motion.button>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>

        {/* Hero Section */}
        <section
          id="hero"
          className={`relative min-h-screen flex items-center justify-center py-20 px-6 transition-colors duration-300 ${
            isDarkMode
              ? "bg-gradient-to-br from-gray-800 to-blue-900"
              : "bg-gradient-to-br from-blue-50 to-purple-50"
          }`}
        >
          <div className="container mx-auto text-center">
            <div className="mb-8">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <User className="w-16 h-16 text-white" />
              </div>

              <h1
                className={`text-5xl font-bold mb-4 transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gradient-to-r from-gray-100 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent"
                }`}
              >
                Md. Mehedy Hasan Siam
              </h1>

              <p
                className={`text-xl mb-6 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                QA Automation Engineer | Manual Tester | Backend Developer
              </p>

              <div className="flex justify-center flex-wrap gap-2 mb-8">
                <Badge
                  variant="secondary"
                  className={`text-sm backdrop-blur-sm border transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-gray-800/80 border-blue-400/50 text-gray-200"
                      : "bg-white/80 border-blue-200/50 text-gray-700"
                  }`}
                >
                  <TestTube className="w-4 h-4 mr-1" />
                  QA Automation
                </Badge>
                <Badge
                  variant="secondary"
                  className={`text-sm backdrop-blur-sm border transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-gray-800/80 border-blue-400/50 text-gray-200"
                      : "bg-white/80 border-blue-200/50 text-gray-700"
                  }`}
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Manual Testing
                </Badge>
                <Badge
                  variant="secondary"
                  className={`text-sm backdrop-blur-sm border transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-gray-800/80 border-blue-400/50 text-gray-200"
                      : "bg-white/80 border-blue-200/50 text-gray-700"
                  }`}
                >
                  <Code className="w-4 h-4 mr-1" />
                  Node.js Developer
                </Badge>
                <Badge
                  variant="secondary"
                  className={`text-sm backdrop-blur-sm border transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-gray-800/80 border-blue-400/50 text-gray-200"
                      : "bg-white/80 border-blue-200/50 text-gray-700"
                  }`}
                >
                  <Zap className="w-4 h-4 mr-1" />
                  Performance Monitoring
                </Badge>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => setIsCVModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg"
              >
                <FileText className="w-4 h-4 mr-2" />
                View CV
              </Button>
              <Button
                variant="outline"
                className={`backdrop-blur-sm border transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-800/80 border-blue-400 hover:bg-gray-700/80 text-gray-200"
                    : "bg-white/80 border-blue-200 hover:bg-blue-50/80 text-gray-700"
                }`}
                onClick={() => scrollToSection("contact")}
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Me
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <motion.section
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className={`py-16 px-6 transition-colors duration-300 ${
            isDarkMode ? "bg-gray-800/50" : "bg-white/50"
          }`}
        >
          <div className="container mx-auto">
            <motion.h2
              variants={itemVariants}
              className={`text-3xl font-bold text-center mb-12 transition-colors duration-300 ${
                isDarkMode ? "text-gray-100" : "text-gray-900"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              About Me
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Card
                className={`transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <CardContent className="p-8">
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className={`text-lg leading-relaxed mb-6 transition-colors duration-300 text-justify hyphens-auto ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                    style={{
                      textAlign: "justify",
                      textJustify: "inter-word",
                      wordSpacing: "0.1em",
                    }}
                  >
                    I am a dedicated Quality Assurance professional with over 2
                    years of experience in manual and automated testing.
                    Currently working as a Junior QA Engineer at Robi Axiata
                    PLC, I specialize in ensuring software quality through
                    comprehensive testing strategies, performance monitoring,
                    and automation frameworks. My expertise includes working
                    with enterprise-level monitoring tools like Dynatrace and
                    Grafana for system performance analysis, and extensive
                    automation experience with Java, Selenium WebDriver, and BDD
                    frameworks.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className={`text-lg leading-relaxed transition-colors duration-300 text-justify hyphens-auto ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                    style={{
                      textAlign: "justify",
                      textJustify: "inter-word",
                      wordSpacing: "0.1em",
                    }}
                  >
                    At Robi, I manage test workflows through JIRA and Service
                    Desk, design comprehensive test cases, and conduct API
                    monitoring to ensure optimal telecommunications service
                    reliability. During my internship at a1qa, I developed
                    robust automation frameworks using Java, Cucumber, and
                    TestNG, implemented CI/CD pipelines with Docker, and
                    performed extensive API testing with RestAssured. My
                    technical skills span across performance testing with
                    JMeter, cross-browser testing with BrowserStack, detailed
                    reporting with Allure, and backend development using
                    node.js. I am passionate about delivering high-quality
                    software solutions and continuously improving testing
                    processes to enhance product reliability and user
                    experience.
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          id="experience"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className={`py-16 px-6 transition-colors duration-300 ${
            isDarkMode ? "bg-gray-900/50" : "bg-gray-50/50"
          }`}
        >
          <div className="container mx-auto">
            <motion.h2
              variants={itemVariants}
              className={`text-3xl font-bold text-center mb-12 transition-colors duration-300 ${
                isDarkMode ? "text-gray-100" : "text-gray-900"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Professional Experience
            </motion.h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <Card
                    className={`overflow-hidden border-l-4 border-l-blue-500 transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl text-blue-600">
                            {exp.title}
                          </CardTitle>
                          <CardDescription
                            className={`text-lg font-semibold transition-colors duration-300 ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            {exp.company}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="outline"
                            className={`transition-colors duration-300 ${
                              isDarkMode
                                ? "border-gray-600 text-gray-300"
                                : "border-gray-300 text-gray-700"
                            }`}
                          >
                            {exp.type}
                          </Badge>
                          <p
                            className={`text-sm mt-1 transition-colors duration-300 ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {exp.period}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p
                        className={`mb-4 transition-colors duration-300 text-justify hyphens-auto leading-relaxed ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                        style={{
                          textAlign: "justify",
                          textJustify: "inter-word",
                          wordSpacing: "0.1em",
                        }}
                      >
                        {exp.description}
                      </p>
                      <motion.div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skillIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              delay: 0.1 * skillIndex,
                              duration: 0.3,
                            }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <Badge
                              variant="secondary"
                              className={`transition-colors duration-300 ${
                                isDarkMode
                                  ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          id="education"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className={`py-16 px-6 transition-colors duration-300 ${
            isDarkMode ? "bg-gray-800/50" : "bg-white/50"
          }`}
        >
          <div className="container mx-auto">
            <motion.h2
              variants={itemVariants}
              className={`text-3xl font-bold text-center mb-12 transition-colors duration-300 ${
                isDarkMode ? "text-gray-100" : "text-gray-900"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Education
            </motion.h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <Card
                    className={`transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <motion.div
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                              isDarkMode ? "bg-blue-900" : "bg-blue-100"
                            }`}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.8 }}
                          >
                            <GraduationCap className="w-6 h-6 text-blue-600" />
                          </motion.div>
                          <div>
                            <h3
                              className={`text-lg font-semibold transition-colors duration-300 ${
                                isDarkMode ? "text-gray-100" : "text-gray-900"
                              }`}
                            >
                              {edu.degree}
                            </h3>
                            <p
                              className={`transition-colors duration-300 ${
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              {edu.institution}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="outline"
                            className={`transition-colors duration-300 ${
                              isDarkMode
                                ? "border-gray-600 text-gray-300"
                                : "border-gray-300 text-gray-700"
                            }`}
                          >
                            {edu.type}
                          </Badge>
                          <p
                            className={`text-sm mt-1 transition-colors duration-300 ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {edu.year}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className={`py-16 px-6 transition-colors duration-300 ${
            isDarkMode ? "bg-gray-900/50" : "bg-gray-50/50"
          }`}
        >
          <div className="container mx-auto">
            <motion.h2
              variants={itemVariants}
              className={`text-3xl font-bold text-center mb-12 transition-colors duration-300 ${
                isDarkMode ? "text-gray-100" : "text-gray-900"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Skills & Expertise
            </motion.h2>
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skillGroup, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className={`h-full transition-all duration-300 ${
                      isDarkMode
                        ? "bg-gradient-to-br from-gray-800 to-blue-900 hover:from-blue-900 hover:to-purple-900"
                        : "bg-gradient-to-br from-white to-blue-50 hover:from-blue-50 hover:to-purple-50"
                    }`}
                  >
                    <CardHeader>
                      <CardTitle
                        className={`text-lg text-center bg-gradient-to-r ${
                          isDarkMode
                            ? "from-blue-400 to-purple-400"
                            : "from-blue-600 to-purple-600"
                        } bg-clip-text text-transparent`}
                      >
                        {skillGroup.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {skillGroup.items.map((skill, skillIndex) => (
                          <motion.div
                            key={skillIndex}
                            className="flex items-center space-x-2"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              delay: 0.1 * skillIndex,
                              duration: 0.3,
                            }}
                            whileHover={{ x: 5, color: "#3b82f6" }}
                          >
                            <Zap className="w-4 h-4 text-blue-500" />
                            <span
                              className={`text-sm transition-colors duration-300 ${
                                isDarkMode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              {skill}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden"
        >
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 60 + 20,
                height: Math.random() * 60 + 20,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}

          <div className="container mx-auto relative z-10">
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Get In Touch
            </motion.h2>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <motion.div
                variants={itemVariants}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-4">Let's Connect</h3>
                  <p className="text-lg mb-6 text-white/90">
                    Ready to discuss your next QA project? Let's connect and
                    explore how I can help ensure your software quality.
                  </p>
                </div>

                <div className="space-y-4">
                  <motion.div
                    className="flex items-center space-x-3"
                    whileHover={{ scale: 1.05, x: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="text-lg">mehedisiam10@gmail.com</span>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-3"
                    whileHover={{ scale: 1.05, x: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="text-lg">+880 1793179626</span>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-3"
                    whileHover={{ scale: 1.05, x: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="text-lg">Sirajganj, Bangladesh</span>
                  </motion.div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <a
                      href="https://github.com/MehedyHasan10"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="secondary"
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </Button>
                    </a>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <a
                      href="https://www.linkedin.com/in/md-mehedy-hasan-siam"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="secondary"
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                    </a>
                  </motion.div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                variants={itemVariants}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </motion.section>

        <footer
          className={`py-8 px-6 transition-colors duration-300 ${
            isDarkMode ? "bg-gray-900 text-white" : "bg-gray-900 text-white"
          }`}
        >
          <div className="container mx-auto text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              &copy; {new Date().getFullYear()} Md. Mehedy Hasan Siam. All
              rights reserved.
            </motion.p>
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
}
