import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; 

function Sidebar() {
    const [editOpen, setEditOpen] = useState(false);
    const location = useLocation(); 

    // Define a standard style for all icons (SVGs and Bootstrap icons)
    const iconSizeStyle = { width: "24px", height: "24px", minWidth: "24px", minHeight: "24px" };

    // Helper function to dynamically set the active class
    const getLinkClass = (path) => {
        return location.pathname === path 
            ? "nav-link active d-flex align-items-center"
            : "nav-link text-white d-flex align-items-center";
    };

    // Helper function to dynamically set the active style
    const getLinkStyle = (path) => {
        return location.pathname === path
            ? { backgroundColor: "#299D91", color: "white" } // Active style
            : {};
    };

    return (
        <div
          className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
          style={{ width: "280px", height:"100vh" }} 
        >
          {/* Sidebar Header */}
          <Link
            to="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <span className="fs-4 fw-bold">J-Expense</span>
          </Link>
          <hr />

          {/* Navigation */}
          <div style={{ flexGrow: 1, overflowY: 'auto' }}>
            <ul className="nav nav-pills flex-column"> 
              
              <li>
                <Link
                    to="/"
                    className={getLinkClass("/")}
                    style={getLinkStyle("/")}
                >
                  {/* Dashboard Icon: Applied standard size */}
                  <i className="bi bi-grid me-2" style={iconSizeStyle}></i>
                Dashboard
                </Link>
              </li>

              <li>
                <Link 
                    to="/budgets" 
                    className={getLinkClass("/budgets")}
                    style={getLinkStyle("/budgets")}
                >
                  {/* Budgets Icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  style ={{marginRight:"12px"}}>
                    <path d="M10.4197 20.0001H6.00977V15.5901L19.0098 2.59009L23.4197 7.00006L10.4197 20.0001ZM8.00977 18.0001H9.58978L20.5898 7.00006L19.0098 5.41003L8.00977 16.41V18.0001Z" fill="#FFFFF4"/>
                    <path d="M8.71695 14.2881L7.30273 15.7023L10.3009 18.7004L11.7151 17.2862L8.71695 14.2881Z" fill="white"/>
                    <path d="M17 24H0V0H17V4H15V2H2V22H15V17H17V24Z" fill="white"/>
                    <path d="M12 4H4V6H12V4Z" fill="white"/>
                    <path d="M9 8H4V10H9V8Z" fill="white"/>
                    <path d="M6 12H4V14H6V12Z" fill="white"/>
                  </svg>
                  Budgets
                </Link>
              </li>

              <li>
                <Link 
                    to="/transactions" 
                    className={getLinkClass("/transactions")}
                    style={getLinkStyle("/transactions")}
                >
                  {/* Transactions */}
                  <i className="bi bi-arrow-left-right me-2" style={iconSizeStyle}></i>
                  Transactions
                </Link>
              </li>

              <li>
                <Link 
                    to="/bills" 
                    className={getLinkClass("/bills")}
                    style={getLinkStyle("/bills")}
                >
                  {/* Bills Icon:*/}
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style = {{marginRight:"13px"}}>
                    <path d="M7.50001 8.50397H10C10.2652 8.50397 10.5196 8.39862 10.7071 8.21108C10.8947 8.02355 11 7.76919 11 7.50397C11 7.23876 10.8947 6.9844 10.7071 6.79687C10.5196 6.60933 10.2652 6.50397 10 6.50397H9.00001V6.00397C9.00001 5.73876 8.89465 5.4844 8.70711 5.29687C8.51958 5.10933 8.26522 5.00397 8.00001 5.00397C7.73479 5.00397 7.48044 5.10933 7.2929 5.29687C7.10537 5.4844 7.00001 5.73876 7.00001 6.00397V6.55397C6.39243 6.67735 5.85237 7.02208 5.48466 7.52124C5.11696 8.0204 4.94785 8.63839 5.01015 9.25522C5.07246 9.87206 5.36174 10.4437 5.82184 10.8593C6.28194 11.2748 6.88003 11.5046 7.50001 11.504H8.50001C8.63262 11.504 8.75979 11.5567 8.85356 11.6504C8.94733 11.7442 9.00001 11.8714 9.00001 12.004C9.00001 12.1366 8.94733 12.2638 8.85356 12.3575C8.75979 12.4513 8.63262 12.504 8.50001 12.504H6.00001C5.73479 12.504 5.48044 12.6093 5.2929 12.7969C5.10537 12.9844 5.00001 13.2388 5.00001 13.504C5.00001 13.7692 5.10537 14.0235 5.2929 14.2111C5.48044 14.3986 5.73479 14.504 6.00001 14.504H7.00001V15.004C7.00001 15.2692 7.10537 15.5235 7.2929 15.7111C7.48044 15.8986 7.73479 16.004 8.00001 16.004C8.26522 16.004 8.51958 15.8986 8.70711 15.7111C8.89465 15.5235 9.00001 15.2692 9.00001 15.004V14.454C9.60758 14.3306 10.1476 13.9859 10.5154 13.4867C10.8831 12.9875 11.0522 12.3696 10.9899 11.7527C10.9276 11.1359 10.6383 10.5642 10.1782 10.1487C9.71807 9.73312 9.11998 9.50335 8.50001 9.50397H7.50001C7.3674 9.50397 7.24022 9.4513 7.14645 9.35753C7.05269 9.26376 7.00001 9.13658 7.00001 9.00397C7.00001 8.87137 7.05269 8.74419 7.14645 8.65042C7.24022 8.55665 7.3674 8.50397 7.50001 8.50397ZM19 10.004H16V1.00397C16.0007 0.827765 15.9548 0.654498 15.867 0.501721C15.7792 0.348943 15.6526 0.222079 15.5 0.133975C15.348 0.0462063 15.1755 0 15 0C14.8245 0 14.652 0.0462063 14.5 0.133975L11.5 1.85397L8.50001 0.133975C8.34799 0.0462063 8.17554 0 8.00001 0C7.82447 0 7.65203 0.0462063 7.50001 0.133975L4.50001 1.85397L1.50001 0.133975C1.34799 0.0462063 1.17554 0 1.00001 0C0.824471 0 0.652027 0.0462063 0.500008 0.133975C0.347404 0.222079 0.220789 0.348943 0.132986 0.501721C0.0451828 0.654498 -0.000691685 0.827765 7.88288e-06 1.00397V17.004C7.88288e-06 17.7996 0.316078 18.5627 0.878688 19.1253C1.4413 19.6879 2.20436 20.004 3.00001 20.004H17C17.7957 20.004 18.5587 19.6879 19.1213 19.1253C19.6839 18.5627 20 17.7996 20 17.004V11.004C20 10.7388 19.8947 10.4844 19.7071 10.2969C19.5196 10.1093 19.2652 10.004 19 10.004ZM3.00001 18.004C2.73479 18.004 2.48044 17.8986 2.2929 17.7111C2.10536 17.5235 2.00001 17.2692 2.00001 17.004V2.73397L4.00001 3.87397C4.15435 3.95459 4.32589 3.99669 4.50001 3.99669C4.67413 3.99669 4.84567 3.95459 5.00001 3.87397L8.00001 2.15397L11 3.87397C11.1543 3.95459 11.3259 3.99669 11.5 3.99669C11.6741 3.99669 11.8457 3.95459 12 3.87397L14 2.73397V17.004C14.0027 17.3451 14.0636 17.6833 14.18 18.004H3.00001ZM18 17.004C18 17.2692 17.8947 17.5235 17.7071 17.7111C17.5196 17.8986 17.2652 18.004 17 18.004C16.7348 18.004 16.4804 17.8986 16.2929 17.7111C16.1054 17.5235 16 17.2692 16 17.004V12.004H18V17.004Z" fill="white" fill-opacity="0.7"/>
                  </svg>
                  Bills
                </Link>
              </li>

              <li>
                <Link 
                    to="/expenses" 
                    className={getLinkClass("/expenses")}
                    style={getLinkStyle("/expenses")}
                >
                  {/* Expenses Icon: */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:"13px"}}>
                    <path d="M15.5 17H21.5M21.5 17L19 19.5M21.5 17L19 14.5" stroke="white" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21.5 13V5C21.5 4.60218 21.342 4.22064 21.0607 3.93934C20.7794 3.65804 20.3978 3.5 20 3.5H4C3.60218 3.5 3.22064 3.65804 2.93934 3.93934C2.65804 4.22064 2.5 4.60218 2.5 5V19C2.5 19.3978 2.65804 19.7794 2.93934 20.0607C3.22064 20.342 3.60218 20.5 4 20.5H14.235" stroke="white" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 7V17" stroke="white" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.5 8.5H8.75C8.28587 8.5 7.84075 8.68437 7.51256 9.01256C7.18437 9.34075 7 9.78587 7 10.25C7 10.7141 7.18437 11.1592 7.51256 11.4874C7.84075 11.8156 8.28587 12 8.75 12H11.25C11.7141 12 12.1592 12.1844 12.4874 12.5126C12.8156 12.8408 13 13.2859 13 13.75C13 14.2141 12.8156 14.6592 12.4874 14.9874C12.1592 15.3156 11.7141 15.5 11.25 15.5H7" stroke="white" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                  Expenses
                </Link>
              </li>

              <li>
                <Link 
                    to="/goals" 
                    className={getLinkClass("/goals")}
                    style={getLinkStyle("/goals")}
                >
                  {/* Goals Icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:"12px"}}>
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M22 12H18" stroke="white" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6 12H2" stroke="white" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 6V2" stroke="white" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 22V18" stroke="white" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                  Goals
                </Link>
              </li>

              <li>
                <Link
                    to="/activity-log" 
                    className={getLinkClass("/activity-log")}
                    style={getLinkStyle("/activity-log")}
                >
                  {/* Activity Log Icon*/}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                    <path d="M4 17H11M20 14L16 18L14 16M4 12H15M4 7H15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                  Activity log
                </Link>
              </li>

              <li>
                <Link 
                    to="/settings" 
                    className={getLinkClass("/settings")}
                    style={getLinkStyle("/settings")}
                >
                  {/* Settings Icon*/}
                  <i className="bi bi-gear me-2" style={iconSizeStyle}></i>
                  Settings
                </Link>
              </li>

              {/* Dropdown example */}
              <li>
                <div className="nav-link d-flex justify-content-between align-items-center text-white" style={{ cursor: "pointer" }} onClick={() => setEditOpen(!editOpen)}>
                  <span className="d-flex align-items-center">
                    {/* Edit Data Icon*/}
                    <i className="bi bi-pencil-fill me-2" style={iconSizeStyle}></i>
                    Edit Data
                  </span>
                  <i className={`bi bi-chevron-${editOpen ? "up" : "down"}`}></i>
                </div>

                {editOpen && (
                  <ul className="nav flex-column ms-4 mt-1">
                    <li>
                      <Link to="/budget-details" className={getLinkClass("/budget-details")} style={getLinkStyle("/budget-details")}>
                        {/* Budget Details Icon */}
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:"12px"}}>
                          <path d="M10.4197 20.0001H6.00977V15.5901L19.0098 2.59009L23.4197 7.00006L10.4197 20.0001ZM8.00977 18.0001H9.58978L20.5898 7.00006L19.0098 5.41003L8.00977 16.41V18.0001Z" fill="#FFFFF4"/>
                          <path d="M8.71695 14.2881L7.30273 15.7023L10.3009 18.7004L11.7151 17.2862L8.71695 14.2881Z" fill="white"/>
                          <path d="M17 24H0V0H17V4H15V2H2V22H15V17H17V24Z" fill="white"/>
                          <path d="M12 4H4V6H12V4Z" fill="white"/>
                          <path d="M9 8H4V10H9V8Z" fill="white"/>
                          <path d="M6 12H4V14H6V12Z" fill="white"/>
                          </svg>  
                        Budget Details
                      </Link>
                    </li>
                    <li>
                      <Link to="/goals-details" className={getLinkClass("/goals-details")} style={getLinkStyle("/goals-details")}>
                        {/* Goals Details Icon */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:"12px"}}>
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M22 12H18" stroke="white" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6 12H2" stroke="white" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 6V2" stroke="white" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 22V18" stroke="white" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        Goals Details
                      </Link>
                    </li>
                    <li>
                      <Link to="/category-details" className={getLinkClass("/category-details")} style={getLinkStyle("/category-details")}>
                        {/* Category Details Icon*/}
                        <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:"12px"}}>
                        <path d="M10.0131 1.15224C9.64554 1.30448 9.31605 1.63397 8.65712 2.29289C7.99835 2.95167 7.66872 3.2813 7.5165 3.64879C7.31351 4.13885 7.31351 4.68953 7.5165 5.17958C7.66874 5.54713 7.99821 5.8766 8.65715 6.53554C9.31572 7.19411 9.64561 7.524 10.013 7.6762C10.5031 7.87918 11.0538 7.87918 11.5438 7.67619C11.9114 7.52395 12.2409 7.19448 12.8998 6.53554C13.5587 5.8766 13.8872 5.54713 14.0395 5.17958C14.2425 4.68953 14.2425 4.13885 14.0395 3.64879C13.8872 3.28125 13.5587 2.95183 12.8998 2.29289C12.2409 1.63396 11.9114 1.30448 11.5438 1.15224C11.0538 0.949253 10.5031 0.949253 10.0131 1.15224Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3.64882 7.51601C3.28128 7.66825 2.9518 7.99773 2.29287 8.65666C1.63411 9.31542 1.30446 9.64507 1.15224 10.0126C0.949253 10.5026 0.949253 11.0533 1.15224 11.5434C1.30448 11.9109 1.63396 12.2404 2.29289 12.8993C2.95146 13.5579 3.28136 13.8878 3.64879 14.04C4.13885 14.243 4.68953 14.243 5.17958 14.04C5.54713 13.8877 5.8766 13.5583 6.53554 12.8993C7.19448 12.2404 7.52298 11.9109 7.67522 11.5434C7.87821 11.0533 7.87821 10.5026 7.67522 10.0126C7.52298 9.64502 7.19448 9.3156 6.53554 8.65666C5.8766 7.99772 5.54713 7.66825 5.17958 7.51601C4.68953 7.31302 4.13888 7.31302 3.64882 7.51601Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15.0214 8.65666C14.3626 9.31543 14.033 9.64507 13.8808 10.0126C13.6778 10.5026 13.6778 11.0533 13.8808 11.5434C14.033 11.9109 14.3625 12.2404 15.0214 12.8993C15.68 13.5579 16.0099 13.8878 16.3773 14.04C16.8674 14.243 17.418 14.243 17.9081 14.04C18.2756 13.8877 18.6051 13.5583 19.2641 12.8993C19.923 12.2404 20.2515 11.9109 20.4037 11.5434C20.6067 11.0533 20.6067 10.5026 20.4037 10.0126C20.2515 9.64502 19.923 9.31559 19.2641 8.65666C18.6051 7.99773 18.2756 7.66825 17.9081 7.51601C17.418 7.31302 16.8674 7.31302 16.3773 7.51601C16.0098 7.66825 15.6803 7.99773 15.0214 8.65666Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.0131 13.8803C9.64554 14.0325 9.31606 14.362 8.65712 15.0209C7.99836 15.6797 7.66872 16.0093 7.5165 16.3768C7.31351 16.8669 7.31351 17.4176 7.5165 17.9076C7.66874 18.2752 7.99821 18.6046 8.65715 19.2636C9.31571 19.9221 9.64561 20.252 10.013 20.4042C10.5031 20.6072 11.0538 20.6072 11.5438 20.4042C11.9114 20.252 12.2409 19.9225 12.8998 19.2636C13.5587 18.6046 13.8872 18.2752 14.0395 17.9076C14.2425 17.4176 14.2425 16.8669 14.0395 16.3768C13.8872 16.0093 13.5587 15.6799 12.8998 15.0209C12.2409 14.362 11.9114 14.0325 11.5438 13.8803C11.0538 13.6773 10.5031 13.6773 10.0131 13.8803Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Category Details
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

            </ul>
          </div>

          {/* Logout */}
          <div className="mt-auto mb-3">
            <Link to="/logout" className="nav-link d-flex align-items-center text-white" style={{ gap: "10px", paddingLeft: "12px" }}>
              {/* Logout Icon: Applied standard size */}
              <i className="bi bi-box-arrow-right me-2" style={iconSizeStyle}></i>
              Logout
            </Link>
          </div>

          {/* Profile */}
          <hr className="mt-3 mb-3"/>
          <div className="d-flex align-items-center flex-column text-white">
            <div className="d-flex align-items-center w-100">
              <img
                src="https://github.com/mdo.png"
                alt="User"
                width="40"
                height="40"
                className="rounded-circle me-2"
              />
              <div className="d-flex flex-column">
                <strong style={{ fontSize: "1rem" }}>Random white dude</strong>
                <a href="#" className="text-white text-decoration-none" style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                  View profile
                </a>
              </div>
            </div>
          </div>
        </div>
    );
}

export default Sidebar;