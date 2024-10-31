/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Outlet, Route, Routes, Navigate } from "react-router-dom";
import Header from "../../views/layout/Header";
import Sidebar from "../../views/layout/Sidebar";
import ChatSidebar from "../../components/Mainpages/chatSidebar";
import ComponentSidebar from "../../components/ComponentSidebar";
import EmailSidebar from "../../components/Mainpages/emailSidebar";
import SettingsSidebar from "../../components/SettingsSidebar";
import BasicInputs from "../../views/pages/Ui_Interface/Forms/BasicInputs";
import InputGroups from "../../views/pages/Ui_Interface/Forms/InputGroups";
import HorizontalForm from "../../views/pages/Ui_Interface/Forms/HorizontalForm";
import VerticalForm from "../../views/pages/Ui_Interface/Forms/VerticalForm";
import Formmask from "../../views/pages/Ui_Interface/Forms/Formmask";
import Formvalidation from "../../views/pages/Ui_Interface/Forms/Formvalidation";
import TablesBasic from "../../views/pages/Ui_Interface/Tables/TablesBasic";
import DataTables from "../../views/pages/Ui_Interface/Tables/DataTables";
import PerformanceIndicator from "../../views/pages/Performance/Performance/PerformanceIndicator";
import PerformanceReview from "../../views/pages/Performance/Performance/PerformanceReview";
import PerformanceAppraisal from "../../views/pages/Performance/Performance/PerformanceAppraisal";
import GoalTracking from "../../views/pages/Performance/Goals/GoalTracking";
import GoalType from "../../views/pages/Performance/Goals/GoalType";
import Trainers from "../../views/pages/Performance/Training/Trainers";
import Training from "../../views/pages/Performance/Training/Training";
import TrainingType from "../../views/pages/Performance/Training/TrainingType";

// import EmployeeProfile from "../../views/pages/Pages/profile/Employeeprofile";
import AdminDashboard from "../../views/pages/MainPages/Dashboard/AdminDashboard/adminDashboard";
import EmployeeDashboard from "../../views/pages/MainPages/Dashboard/EmployeeDashboard";
import Chat from "../../views/pages/MainPages/Apps/chat";
import VoiceCall from "../../views/pages/MainPages/Apps/calls/voiceCall";
import VideoCall from "../../views/pages/MainPages/Apps/calls/VideoCall";
import Outgoing from "../../views/pages/MainPages/Apps/calls/outgoingCall";
import IncomingCall from "../../views/pages/MainPages/Apps/calls/incomingCall";
import Calendar from "../../views/pages/MainPages/Apps/calendar";
import Contacts from "../../views/pages/MainPages/Apps/contacts";
import Email from "../../views/pages/MainPages/Apps/Email";
import FileManager from "../../views/pages/MainPages/Apps/FileManager";
import Editer from "../../components/Editer/Editer";

import Compose from "../../views/pages/MainPages/Apps/Email/compose";
import Estimates from "../../views/pages/HR/Sales/Estimates";
import CreateEstimate from "../../views/pages/HR/Sales/Estimates/createEstimate";
import EditEstimate from "../../views/pages/HR/Sales/Estimates/EditEstimate";
import Invoices from "../../views/pages/HR/Sales/Invoices/Index";
import CreateInvoice from "../../views/pages/HR/Sales/Invoices/createInvoice";
import EditInvoice from "../../views/pages/HR/Sales/Invoices/editInvoice";
import InvoiceView from "../../views/pages/HR/Sales/Invoices/invoiceView";
import Payments from "../../views/pages/HR/Sales/payments";
import Promotion from "../../views/pages/Performance/Promotion";
import Resignation from "../../views/pages/Performance/Resignation";
import Termination from "../../views/pages/Performance/Termination";
import Components from "../../views/pages/Ui_Interface/Components/Components";
import Settings from "../../views/pages/Administration/Settings/Settings";
import Localization from "../../views/pages/Administration/Settings/Localization";
import ThemeSettings from "../../views/pages/Administration/Settings/ThemeSettings";
import RolesPermissions from "../../views/pages/Administration/Settings/RolesPermissions";
import EmailSettings from "../../views/pages/Administration/Settings/EmailSettings";
import PerformanceSetting from "../../views/pages/Administration/Settings/Performance/PerformanceSetting";
import ApprovalSetting from "../../views/pages/Administration/Settings/ApprovalSetting";
import InvoiceSettings from "../../views/pages/Administration/Settings/InvoiceSettings";
import SalarySettings from "../../views/pages/Administration/Settings/SalarySettings";
import NotificationSettings from "../../views/pages/Administration/Settings/NotificationSettings";
import LeaveType from "../../views/pages/Administration/Settings/LeaveType";
import ToxboxSetting from "../../views/pages/Administration/Settings/ToxboxSetting";
import CronSetting from "../../views/pages/Administration/Settings/CronSetting";
import AllEmpoyee from "../../views/pages/Employees/AllEmpoyee";
import Holidays from "../../views/pages/Employees/Holidays";
import AdminLeave from "../../views/pages/Employees/AdminLeave";
import EmployeeLeave from "../../views/pages/Employees/EmployeeLeave";
import LeaveSettings from "../../views/pages/Employees/LeaveSetting";
import AttendenceAdmin from "../../views/pages/Employees/Attendenceadmin";
import AttendanceEmployee from "../../views/pages/Employees/AttendenceEmployee";
import Department from "../../views/pages/Employees/Department";
import Designation from "../../views/pages/Employees/Designation";
import TimeSheet from "../../views/pages/Employees/TimeSheet";
import ShiftScheduling from "../../views/pages/Employees/ShiftandSchedule";
import ShiftList from "../../views/pages/Employees/ShiftList";
import OverTime from "../../views/pages/Employees/OverTime";
import Clients from "../../views/pages/Employees/Clients";
import Project from "../../views/pages/Employees/Projects/Project";
import ClientList from "../../views/pages/Employees/ClientList";
import Tasks from "../../views/pages/Employees/Projects/Tasks";
import { SidebarProject } from "../../views/pages/Employees/Projects/SidebarProject";
import TaskBoard from "../../views/pages/Employees/Projects/TaskBoard";
import Leads from "../../views/pages/Employees/Leads";
import Ticket from "../../views/pages/Employees/Ticket";
import ClientProfile from "../../views/pages/Profile/ClientProfile";
import Profile from "../../views/pages/Profile/Profile";
import Subscribtions from "../../views/pages/Subscribtions/Subscribtions";
import SubscribedCompany from "../../views/pages/Subscribtions/SubscribedCompany";
import SubscribtionsCompany from "../../views/pages/Subscribtions/SubscribtionsCompany";
import Search from "../../views/pages/Pages/Search/Search";
import Faq from "../../views/pages/Pages/Faq";
import Terms from "../../views/pages/Pages/Terms";
import PrivacyPolicy from "../../views/pages/Pages/PrivacyPolicy";
import BlankPage from "../../views/pages/Pages/BlankPage";
import KnowledgeBase from "../../views/pages/Administration/Knowledgebase/KnowledgeBase";
import KnowledgeBaseView from "../../views/pages/Administration/Knowledgebase/KnowledgeBaseView";
import EmployeeList from "../../views/pages/Employees/EmployeeList";
import Expenses from "../../views/pages/HR/Sales/Expenses";
import Activities from "../../views/pages/Administration/Activities";
import ProvidentFund from "../../views/pages/HR/Sales/ProvidentFund";
import Taxes from "../../views/pages/HR/Sales/Taxes";
import Categories from "../../views/pages/HR/Accounting/Categories";
import SubCategory from "../../views/pages/HR/Accounting/Categories/subCategory";
import Budgets from "../../views/pages/HR/Accounting/Budgets.jsx";
import BudgetExpenses from "../../views/pages/HR/Accounting/BudgetExpenses";
import BudgetRevenues from "../../views/pages/HR/Accounting/BudgetRevenue";
import EmployeeSalary from "../../views/pages/HR/Payroll/EmployeeSalary.jsx";
import PaySlip from "../../views/pages/HR/Payroll/Payslip";
import PayrollItems from "../../views/pages/HR/Payroll/PayrollItems.jsx";
import Policies from "../../views/pages/HR/Policies";
import ExpenseReport from "../../views/pages/HR/Reports/ExpenseReport";
import InvoiceReport from "../../views/pages/HR/Reports/InvoiceReport";
import PaymentReport from "../../views/pages/HR/Reports/PaymentReport";
import ProjectReport from "../../views/pages/HR/Reports/ProjectReport";
import TaskReport from "../../views/pages/HR/Reports/TaskReport";
import UserReport from "../../views/pages/HR/Reports/UserReport";
import EmployeeReport from "../../views/pages/HR/Reports/EmployeeReports";
import PaySlipReports from "../../views/pages/HR/Reports/PaySlipReports";
import AttendanceReport from "../../views/pages/HR/Reports/AttendanceReport";
import LeaveReport from "../../views/pages/HR/Reports/LeaveReport";
import DailyReports from "../../views/pages/HR/Reports/DailyReports";
import Assets from "../../views/pages/Administration/Assets";
import UserDashboard from "../../views/pages/Administration/Jobs/UserJob/UserDashboard";
import UserAllJobs from "../../views/pages/Administration/Jobs/UserJob/UserAllJobs";
import SavedJobs from "../../views/pages/Administration/Jobs/UserJob/SavedJobs";
import AppliedJobs from "../../views/pages/Administration/Jobs/UserJob/AppliedJobs";
import Interviewing from "../../views/pages/Administration/Jobs/UserJob/Interviewing";
import JobAptitude from "../../views/pages/Administration/Jobs/UserJob/JobAptitude";
import Questions from "../../views/pages/Administration/Jobs/UserJob/Questions";
import UserOfferedJobs from "../../views/pages/Administration/Jobs/UserJob/UserOfferedJobs";
import VisitedJobs from "../../views/pages/Administration/Jobs/UserJob/VisitedJobs";
import ArchivedJobs from "../../views/pages/Administration/Jobs/UserJob/ArchivedJobs";
import JobsDashboard from "../../views/pages/Administration/Jobs/JobDashboard";
import ManageJobs from "../../views/pages/Administration/Jobs/ManageJobs";
import ManageJobResumes from "../../views/pages/Administration/Jobs/ManageResumes";
import ShortListCandidates from "../../views/pages/Administration/Jobs/ShortListCandidates";
import InterviewingQuestions from "../../views/pages/Administration/Jobs/InterviewingQuestions";
import OfferApprovals from "../../views/pages/Administration/Jobs/OfferApprovals";
import ExperienceLevel from "../../views/pages/Administration/Jobs/ExperienceLevel";
import CanditatesList from "../../views/pages/Administration/Jobs/CanditatesList";
import ScheduleTiming from "../../views/pages/Administration/Jobs/ScheduleTiming.jsx";
import AptitudeResults from "../../views/pages/Administration/Jobs/AptitudeResults";
import Users from "../../views/pages/Administration/Users";
import ProjectList from "../../views/pages/Employees/Projects/ProjectList";
import ProjectView from "../../views/pages/Employees/Projects/ProjectView";
import OffCanvas from "../../components/OffCanvas";
import FormSelectTwo from "../../views/pages/Ui_Interface/Forms/FormSelectTwo.jsx";
import FileUpload from "../../views/pages/Ui_Interface/Forms/FileUpload.jsx";
import Ribbon from "../../views/pages/Ui_Interface/Elements/Ribbon.jsx";
import Clipboard from "../../views/pages/Ui_Interface/Elements/Clipboard.jsx";
import Dragdrop from "../../views/pages/Ui_Interface/Elements/Dragdrop.jsx";
import Ratings from "../../views/pages/Ui_Interface/Elements/Rating.jsx";
import Texteditor from "../../views/pages/Ui_Interface/Elements/Texteditor.jsx";
import Counter from "../../views/pages/Ui_Interface/Elements/Counter.jsx";
import Scrollbar from "../../views/pages/Ui_Interface/Elements/Scrollbar.jsx";
import Notification from "../../views/pages/Ui_Interface/Elements/Notification.jsx";
import Stickynotes from "../../views/pages/Ui_Interface/Elements/Stickynote.jsx";
import Timeline from "../../views/pages/Ui_Interface/Elements/Timeline.jsx";
import Formwizard from "../../views/pages/Ui_Interface/Elements/Formwizard.jsx";
import Apexchart from "../../views/pages/Ui_Interface/Charts/Apexcharts.jsx";
import ChartJs from "../../views/pages/Ui_Interface/Charts/Chartjs.jsx";
import MorrisCharts from "../../views/pages/Ui_Interface/Charts/Morrischarts.jsx";
import FlotCharts from "../../views/pages/Ui_Interface/Charts/Flotcharts.jsx";
import PeityCharts from "../../views/pages/Ui_Interface/Charts/Peitycharts.jsx";
import C3Charts from "../../views/pages/Ui_Interface/Charts/C3charts.jsx";
import FontAwesomeicons from "../../views/pages/Ui_Interface/Icons/Fontawesomeicons.jsx";
import FeatherIcons from "../../views/pages/Ui_Interface/Icons/Feathericons.jsx";
import IonicIcon from "../../views/pages/Ui_Interface/Icons/Ionicicons.jsx";
import MaterialIcons from "../../views/pages/Ui_Interface/Icons/Materialicons.jsx";
import Pe7Icon from "../../views/pages/Ui_Interface/Icons/Pe7icons.jsx";
import SimpleLine from "../../views/pages/Ui_Interface/Icons/Simpleicons.jsx";
import Themifyicons from "../../views/pages/Ui_Interface/Icons/Themifyicons.jsx";
import WeatherIcons from "../../views/pages/Ui_Interface/Icons/Weathericons.jsx";
import Typicons from "../../views/pages/Ui_Interface/Icons/Typicons.jsx";
import FlagIcons from "../../views/pages/Ui_Interface/Icons/Flagicons.jsx";
import ContactList from "../../views/pages/Crm/ContactList.jsx";
import ContactGrid from "../../views/pages/Crm/ContactGrid.jsx";
import DealsDashboard from "../../views/pages/MainPages/Dashboard/DealsDashboard/index.jsx";
import LeadsDashboard from "../../views/pages/MainPages/Dashboard/LeadsDashboard/index.jsx";
import TicketDetails from "../../views/pages/Employees/TicketDetails.jsx";
import Companies from "../../views/pages/Crm/companies.jsx";
import ContactDetails from "../../views/pages/Crm/ContactDetails.jsx";
import LeadsList from "../../views/pages/Crm/LeadsList.jsx";
import LeadsKanban from "../../views/pages/Crm/LeadsKanban.jsx";
import LeadsDetails from "../../views/pages/Crm/LeadsDetails.jsx";
import PipeLine from "../../views/pages/Crm/PipeLine.jsx";
import CompaniesGrid from "../../views/pages/Crm/CompaniesGrid.jsx";
import CompanyDetails from "../../views/pages/Crm/CompanyDetails.jsx";
import Deals from "../../views/pages/Crm/Deals.jsx";
import DealsKanban from "../../views/pages/Crm/DealsKanban.jsx";
import Analytics from "../../views/pages/Crm/Analytics.jsx";
import EmailContent from "../../views/pages/MainPages/Apps/Email/emailContent.jsx";
import EmailView from "../../views/pages/MainPages/Apps/Email/emailView.jsx";
import DealsDetails from "../../views/pages/Crm/DealsDetails.jsx";
import ProposalCreation from "../../views/pages/MainPages/Apps/FileManager/proposalcreation.jsx";
import ArchieveProjectDetails from "../../views/pages/MainPages/Apps/FileManager/projectdetails.jsx";
import ProposalDetails from "../../views/pages/MainPages/Apps/FileManager/proposaldetails.jsx";

import ProposalList from "../../views/pages/MainPages/Apps/FileManager/ProposalList.jsx";

import ProtectedRoute from "../../reducers/ProtectedRoute";
import { ProtectedRoutesProvider } from "../../reducers/ProtectedRoutesReducer";

const AppContainer = () => {
  useEffect(() => {
    localStorage.setItem("colorschema", "purple");
    localStorage.setItem("layout", "vertical");
    localStorage.setItem("layoutwidth", "fixed");
    localStorage.setItem("layoutpos", "fluid");
    localStorage.setItem("topbartheme", "light");
    localStorage.setItem("layoutSized", "lg");
    localStorage.setItem("layoutStyling", "default");
    localStorage.setItem("layoutSidebarStyle", "dark");
  }, []);

  //   const ProtectedRoute = ({ allowedRoles, children }) => {
  //   const {userRole} = useSelector((state) => state.authSlice);
  //   return allowedRoles.includes(userRole) ? children : <Navigate to="/unauthorized" />;
  // };

  const routingObjects = [
    {
      id: 1,
      path: "form-basic-inputs",
      element: <BasicInputs />,
      allowedRoles: ["admin", "Employee"], // Allowed roles for this route
    },
    {
      id: 2,
      path: "admin-dashboard",
      element: <AdminDashboard />,
      allowedRoles: ["admin", "Employee"], // Only admin can access this route
    },
    {
      id: 3,
      path: "form-horizontal",
      element: <HorizontalForm />,
      allowedRoles: ["admin", "Employee"], // Allowed roles for this route
    },
    {
      id: 4,
      path: "form-vertical",
      element: <VerticalForm />,
      allowedRoles: ["admin", "Employee"], // Allowed roles for this route
    },
    {
      id: 5,
      path: "form-mask",
      element: <Formmask />,
      allowedRoles: ["admin", "Employee"], // Allowed roles for this route
    },
    {
      id: 6,
      path: "form-validation",
      element: <Formvalidation />,
      allowedRoles: ["admin", "Employee"], // Allowed roles for this route
    },
    {
      id: 7,
      path: "tables-basic",
      element: <TablesBasic />,
      allowedRoles: ["admin", "Employee"], // Allowed roles for this route
    },
    {
      id: 8,
      path: "data-tables",
      element: <DataTables />,
      allowedRoles: ["admin", "Employee"], // Allowed roles for this route
    },
    {
      id: 9,
      path: "performance-indicator",
      element: <PerformanceIndicator />,
      allowedRoles: ["admin", "Employee"], // Allowed roles for this route
    },
    {
      id: 10,
      path: "performance",
      element: <PerformanceReview />,
      allowedRoles: ["admin", "Employee"], // Allowed roles for this route
    },
    {
      id: 11,
      path: "performance-appraisal",
      element: <PerformanceAppraisal />,
      allowedRoles: ["admin", "Employee"], // Allowed roles for this route
    },
    {
      id: 12,
      path: "goal-tracking",
      element: <GoalTracking />,
      allowedRoles: ["admin", "Employee"], // Allowed roles for this route
    },
    {
      id: 13,
      path: "goal-type",
      element: <GoalType />,
      allowedRoles: ["admin", "Employee"], // Allowed roles for this route
    },
    {
      id: 14,
      path: "trainers",
      element: <Trainers />,
      allowedRoles: ["admin", "Employee"], // Allowed roles for this route
    },
    {
      id: 15,
      path: "training",
      element: <Training />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 16,
      path: "training-type",
      element: <TrainingType />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 17,
      path: "Employee-dashboard",
      element: <EmployeeDashboard />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 18,
      path: "activities",
      element: <Activities />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 19,
      path: "form-input-groups",
      element: <InputGroups />,
      allowedRoles: ["admin", "Employee"],
    },
    // {
    //   id: 20,
    //   path: "profile",
    //   element: <EmployeeProfile />,
    // },
    {
      id: 21,
      path: "events",
      element: <Calendar />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 22,
      path: "contacts",
      element: <Contacts />,
      allowedRoles: ["admin", "Employee"],
    },

    {
      id: 23,
      path: "file-manager",
      element: <FileManager />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 24,
      path: "estimates",
      element: <Estimates />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 25,
      path: "create-estimate",
      element: <CreateEstimate />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 26,
      path: "edit-estimate",
      element: <EditEstimate />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 27,
      path: "invoices",
      element: <Invoices />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 28,
      path: "create-invoice",
      element: <CreateInvoice />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 29,
      path: "edit-invoice",
      element: <EditInvoice />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 30,
      path: "invoice-view",
      element: <InvoiceView />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 31,
      path: "payments",
      element: <Payments />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 32,
      path: "promotion",
      element: <Promotion />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 33,
      path: "resignation",
      element: <Resignation />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 34,
      path: "termination",
      element: <Termination />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 34,
      path: "Employees",
      element: <AllEmpoyee />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 35,
      path: "holidays",
      element: <Holidays />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 36,
      path: "adminleaves",
      element: <AdminLeave />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 37,
      path: "leaves-Employee",
      element: <EmployeeLeave />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 38,
      path: "leave-settings",
      element: <LeaveSettings />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 39,
      path: "adminattendance",
      element: <AttendenceAdmin />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 40,
      path: "attendance-Employee",
      element: <AttendanceEmployee />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 41,
      path: "departments",
      element: <Department />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 42,
      path: "designations",
      element: <Designation />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 43,
      path: "timesheet",
      element: <TimeSheet />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 43,
      path: "shift-scheduling",
      element: <ShiftScheduling />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 44,
      path: "shift-list",
      element: <ShiftList />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 45,
      path: "overtime",
      element: <OverTime />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 46,
      path: "clients",
      element: <Clients />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 47,
      path: "projects",
      element: <Project />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 48,
      path: "clients-list",
      element: <ClientList />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 49,
      path: "task-board",
      element: <TaskBoard />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 50,
      path: "leads",
      element: <Leads />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 51,
      path: "tickets",
      element: <Ticket />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 52,
      path: "client-profile",
      element: <ClientProfile />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 53,
      path: "profile",
      element: <Profile />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 54,
      path: "subscriptions",
      element: <Subscribtions />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 55,
      path: "subscribed-companies",
      element: <SubscribedCompany />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 56,
      path: "subscriptions-company",
      allowedRoles: ["admin", "Employee"],
      element: <SubscribtionsCompany />,
    },
    {
      id: 57,
      path: "search",
      element: <Search />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 58,
      path: "faq",
      element: <Faq />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 59,
      path: "terms",
      element: <Terms />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 60,
      path: "terms",
      element: <Terms />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 61,
      path: "privacy-policy",
      element: <PrivacyPolicy />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 62,
      path: "blank-page",
      element: <BlankPage />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 63,
      path: "knowledgebase",
      element: <KnowledgeBase />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 64,
      path: "knowledgebase-view",
      element: <KnowledgeBaseView />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 64,
      path: "Employees-list",
      element: <EmployeeList />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 65,
      path: "expenses",
      element: <Expenses />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 66,
      path: "provident-fund",
      element: <ProvidentFund />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 67,
      path: "taxes",
      element: <Taxes />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 68,
      path: "categories",
      element: <Categories />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 69,
      path: "sub-category",
      element: <SubCategory />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 70,
      path: "budgets",
      element: <Budgets />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 71,
      path: "budget-expenses",
      element: <BudgetExpenses />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 72,
      path: "budget-revenues",
      element: <BudgetRevenues />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 73,
      path: "salary-view",
      element: <PaySlip />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 74,
      path: "payroll-items",
      element: <PayrollItems />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 75,
      path: "policies",
      element: <Policies />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 76,
      path: "salary",
      element: <EmployeeSalary />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 77,
      path: "expense-reports",
      element: <ExpenseReport />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 78,
      path: "invoice-reports",
      element: <InvoiceReport />,
      allowedRoles: ["admin", "Employee"],
    },

    {
      id: 79,
      path: "payments-reports",
      element: <PaymentReport />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 80,
      path: "project-reports",
      element: <ProjectReport />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 81,
      path: "task-reports",
      element: <TaskReport />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 82,
      path: "user-reports",
      element: <UserReport />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 83,
      path: "Employee-reports",
      element: <EmployeeReport />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 84,
      path: "payslip-reports",
      element: <PaySlipReports />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 85,
      path: "attendance-reports",
      element: <AttendanceReport />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 86,
      path: "attendance-reports",
      element: <AttendanceReport />,
      allowedRoles: ["admin", "Employee"],
    },

    {
      id: 87,
      path: "leave-reports",
      element: <LeaveReport />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 88,
      path: "daily-reports",
      element: <DailyReports />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 89,
      path: "project-list",
      element: <ProjectList />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 90,
      path: "project-view",
      element: <ProjectView />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 91,
      path: "form-select2",
      element: <FormSelectTwo />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 92,
      path: "file-upload",
      element: <FileUpload />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 93,
      path: "ribbon",
      element: <Ribbon />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 94,
      path: "clipboard",
      element: <Clipboard />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 95,
      path: "dragdrop",
      element: <Dragdrop />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 96,
      path: "rating",
      element: <Ratings />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 97,
      path: "text-editor",
      element: <Texteditor />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 98,
      path: "counter",
      element: <Counter />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 99,
      path: "scrollbar",
      element: <Scrollbar />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 100,
      path: "notification",
      element: <Notification />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 101,
      path: "stickynote",
      element: <Stickynotes />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 102,
      path: "timeline",
      element: <Timeline />,
      allowedRoles: ["admin", "Employee"],
    },

    {
      id: 103,
      path: "form-wizard",
      element: <Formwizard />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 104,
      path: "apex-charts",
      element: <Apexchart />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 105,
      path: "chartjs",
      element: <ChartJs />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 106,
      path: "morris-charts",
      element: <MorrisCharts />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 107,
      path: "flot-charts",
      element: <FlotCharts />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 108,
      path: "peity-charts",
      element: <PeityCharts />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 109,
      path: "charts-c3",
      element: <C3Charts />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 110,
      path: "fontawesome-icons",
      element: <FontAwesomeicons />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 111,
      path: "feather-icons",
      element: <FeatherIcons />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 112,
      path: "ionic-icons",
      element: <IonicIcon />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 113,
      path: "material-icons",
      element: <MaterialIcons />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 114,
      path: "pe7-icons",
      element: <Pe7Icon />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 115,
      path: "simpleline-icons",
      element: <SimpleLine />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 116,
      path: "themify-icons",
      element: <Themifyicons />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 117,
      path: "weather-icons",
      element: <WeatherIcons />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 118,
      path: "typicons",
      element: <Typicons />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 119,
      path: "flag-icons",
      element: <FlagIcons />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 120,
      path: "contact-list",
      element: <ContactList />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 121,
      path: "contact-grid",
      element: <ContactGrid />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 122,
      path: "deals-dashboard",
      element: <DealsDashboard />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 123,
      path: "leads-dashboard",
      element: <LeadsDashboard />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 124,
      path: "ticket-details",
      element: <TicketDetails />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 125,
      path: "companies",
      element: <Companies />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 126,
      path: "contact-details",
      element: <ContactDetails />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 126,
      path: "leads-list",
      element: <LeadsList />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 127,
      path: "leads-kanban",
      element: <LeadsKanban />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 128,
      path: "leads-details",
      element: <LeadsDetails />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 128,
      path: "pipeline",
      element: <PipeLine />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 129,
      path: "Companies-grid",
      element: <CompaniesGrid />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 130,
      path: "company-details",
      element: <CompanyDetails />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 131,
      path: "deals",
      element: <Deals />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 132,
      path: "deals-kanban",
      element: <DealsKanban />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 130,
      path: "analytics",
      element: <Analytics />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 131,
      path: "deals-details",
      element: <DealsDetails />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 137,
      path: "view-project-details",
      element: <ArchieveProjectDetails />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 139,
      path: "view-proposal-details",
      element: <ProposalDetails />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 136,
      path: "proposal-creation",
      element: <ProposalCreation />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 138,
      path: "proposal-list",
      element: <ProposalList />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 136,
      path: "editer",
      element: <Editer />,
      allowedRoles: ["admin", "Employee"],
    },
  ];

  const ChatRoutingeObjects = [
    {
      id: 1,
      path: "chat",
      element: <Chat />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 2,
      path: "voice-call",
      element: <VoiceCall />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 3,
      path: "video-call",
      element: <VideoCall />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 4,
      path: "outgoing-call",
      element: <Outgoing />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 5,
      path: "incoming-call",
      element: <IncomingCall />,
      allowedRoles: ["admin", "Employee"],
    },
  ];
  const ComponentsRoutingeObjects = [
    {
      id: 1,
      path: "components",
      element: <Components />,
      allowedRoles: ["admin", "Employee"],
    },
  ];
  const EmailRoutingeObjects = [
    {
      id: 1,
      path: "inbox",
      element: <Email />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 2,
      path: "compose",
      element: <Compose />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 3,
      path: "mail-view",
      element: <EmailView />,
      allowedRoles: ["admin", "Employee"],
    },
  ];
  const SettingsRoutingeObjects = [
    {
      id: 1,
      path: "company-settings",
      element: <Settings />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 2,
      path: "localization",
      element: <Localization />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 3,
      path: "theme-settings",
      element: <ThemeSettings />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 4,
      path: "roles-permissions",
      element: <RolesPermissions />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 5,
      path: "email-settings",
      element: <EmailSettings />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 6,
      path: "performance-setting",
      element: <PerformanceSetting />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 7,
      path: "approval-setting",
      element: <ApprovalSetting />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 8,
      path: "invoice-settings",
      element: <InvoiceSettings />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 9,
      path: "salary-settings",
      element: <SalarySettings />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 10,
      path: "notifications-settings",
      element: <NotificationSettings />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 11,
      path: "leave-type",
      element: <LeaveType />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 14,
      path: "toxbox-setting",
      element: <ToxboxSetting />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 15,
      path: "cron-setting",
      element: <CronSetting />,
      allowedRoles: ["admin", "Employee"],
    },
  ];
  const ProjectRoutingeObjects = [
    {
      id: 1,
      path: "tasks",
      element: <Tasks />,
      allowedRoles: ["admin", "Employee"],
    },
  ];

  const AdministrationRoutingeObjects = [
    {
      id: 1,
      path: "assets",
      element: <Assets />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 2,
      path: "user-dashboard",
      element: <UserDashboard />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 3,
      path: "user-all-jobs",
      element: <UserAllJobs />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 4,
      path: "saved-jobs",
      element: <SavedJobs />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 5,
      path: "applied-jobs",
      element: <AppliedJobs />,
      allowedRoles: ["admin", "Employee"],
    },

    {
      id: 6,
      path: "interviewing",
      element: <Interviewing />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 7,
      path: "job-aptitude",
      element: <JobAptitude />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 8,
      path: "questions",
      element: <Questions />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 9,
      path: "offered-jobs",
      element: <UserOfferedJobs />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 10,
      path: "visited-jobs",
      element: <VisitedJobs />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 11,
      path: "archived-jobs",
      element: <ArchivedJobs />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 12,
      path: "jobs-dashboard",
      element: <JobsDashboard />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 13,
      path: "jobs",
      element: <ManageJobs />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 14,
      path: "manage-resumes",
      element: <ManageJobResumes />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 15,
      path: "shortlist-candidates",
      element: <ShortListCandidates />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 16,
      path: "interview-questions",
      element: <InterviewingQuestions />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 17,
      path: "offer_approvals",
      element: <OfferApprovals />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 18,
      path: "experiance-level",
      element: <ExperienceLevel />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 19,
      path: "candidates",
      element: <CanditatesList />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 21,
      path: "schedule-timing",
      element: <ScheduleTiming />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 22,
      path: "apptitude-result",
      element: <AptitudeResults />,
      allowedRoles: ["admin", "Employee"],
    },
    {
      id: 23,
      path: "users",
      element: <Users />,
      allowedRoles: ["admin", "Employee"],
    },
  ];

  const SidebarLayout = () => (
    <>
      <Header />
      <Sidebar />
      <OffCanvas />
      <Outlet />
    </>
  );
  const AuthendicationLayout = () => <div></div>;
  const ChatSidebarLayout = () => (
    <>
      <Header />
      <ChatSidebar />
      <Outlet />
    </>
  );
  const ComponentSidebarLayout = () => (
    <>
      <Header />
      <ComponentSidebar />
      <Outlet />
    </>
  );
  const EmailSidebarLayout = () => (
    <>
      <Header />
      <EmailSidebar />
      <Outlet />
    </>
  );
  const SettingsSidebarLayout = () => (
    <>
      <Header />
      <SettingsSidebar />
      <Outlet />
    </>
  );
  const ProjectSidebarLayout = () => (
    <>
      <Header />
      <SidebarProject />
      <Outlet />
    </>
  );

  const mobileResponsive = (event) => {
    const excludedHeader = document.querySelector(".header");
    const excludedSidebar = document.querySelector(".sidebar");

    if (
      !excludedHeader.contains(event.target) &&
      !excludedSidebar.contains(event.target)
    ) {
      document.body.classList.remove("slide-nav");
    }
  };

  return (
    <ProtectedRoutesProvider>
      <div className="main-wrapper" onClick={mobileResponsive}>
        <Routes>
          <Route path={"/*"} element={<SidebarLayout />}>
            {routingObjects.map((item) => (
              <Route
                key={item.id}
                path={item.path}
                element={
                  <ProtectedRoute
                    allowedRoles={item.allowedRoles}
                    element={item.element}
                  />
                }
              />
            ))}
          </Route>

          <Route path={"/*"} element={<ChatSidebarLayout />}>
            {ChatRoutingeObjects.map((item) => (
              <Route
                key={item.id}
                path={item.path}
                element={
                  <ProtectedRoute
                    allowedRoles={item.allowedRoles}
                    element={item.element}
                  />
                }
              />
            ))}
          </Route>
          <Route path={"/*"} element={<ComponentSidebarLayout />}>
            {ComponentsRoutingeObjects.map((item) => (
              <Route
                key={item.id}
                path={item.path}
                element={
                  <ProtectedRoute
                    allowedRoles={item.allowedRoles}
                    element={item.element}
                  />
                }
              />
            ))}
          </Route>
          <Route path={"/*"} element={<EmailSidebarLayout />}>
            {EmailRoutingeObjects.map((item) => (
              <Route
                key={item.id}
                path={item.path}
                element={
                  <ProtectedRoute
                    allowedRoles={item.allowedRoles}
                    element={item.element}
                  />
                }
              />
            ))}
          </Route>
          <Route path={"/*"} element={<SettingsSidebarLayout />}>
            {SettingsRoutingeObjects.map((item) => (
              <Route
                key={item.id}
                path={item.path}
                element={
                  <ProtectedRoute
                    allowedRoles={item.allowedRoles}
                    element={item.element}
                  />
                }
              />
            ))}
          </Route>
          <Route path={"/*"} element={<ProjectSidebarLayout />}>
            {ProjectRoutingeObjects.map((item) => (
              <Route
                key={item.id}
                path={item.path}
                element={
                  <ProtectedRoute
                    allowedRoles={item.allowedRoles}
                    element={item.element}
                  />
                }
              />
            ))}
          </Route>

          <Route path={"/*"} element={<SidebarLayout />}>
            {AdministrationRoutingeObjects.map((item) => (
              <Route
                key={item.id}
                path={item.path}
                element={
                  <ProtectedRoute
                    allowedRoles={item.allowedRoles}
                    element={item.element}
                  />
                }
              />
            ))}
          </Route>
          <Route path={"/*"} element={<SidebarLayout />}>
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </div>
    </ProtectedRoutesProvider>
  );
};

export default AppContainer;