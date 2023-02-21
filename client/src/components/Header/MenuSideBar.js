import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaGlobeAsia } from "react-icons/fa";
import { currentPage } from "../../reducers/actions";

const MenuWrapper = styled.a`
  display: flex;
  height: 100%;
  padding: 0 var(--su16);
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: var(--theme-topbar-item-background-hover);
  }
`;
const MenuSidebar = styled.div`
  display: ${(props) => props.display || "block"};
  position: fixed;
  top: 50px;
  height: fit-content;
  box-shadow: 0 0 0 hsl(210deg 8% 5% / 5%);
  transition: box-shadow ease-in-out 0.1s, transform ease-in-out 0.1s;
  transform: translateZ(0);
  background-color: var(--white);
`;
const SidebarNav = styled.ol`
  padding-top: 24px;
  margin: 0 0 var(--su12);
`;
const SelectedItem = styled.li`
  position: relative;
  width: 240px;
  display: flex;
  cursor: pointer;
  text-transform: ${(props) => props.textTransform || "none"};
`;
const NavItemWrapper = styled.li`
  position: relative;
  width: 240px;
  display: flex;
  cursor: pointer;
`;
const NavItem = styled.a`
  display: flex;
  align-items: center;
  padding: 10px 4px 10px 18px;
  color: var(--black-600);
  line-height: var(--lh-md);
  font-size: var(--fs-body1);
  width: 100%;
  &:hover {
    color: var(--black-900);
  }
`;
const Itemflex = styled.span`
  padding-right: 5px;
`;
const NavLink = styled.a`
  display: block;
  font-weight: bold;
  color: var(--black-900);
  background: var(--black-050);
  border-right: 3px solid var(--theme-primary-color);
  width: 100%;
  padding: 10px 4px 10px 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--fs-body1);
`;
function MenuSideBar() {
  const [openMenu, setOpenMenu] = useState(false);
  const { currentPageReducer } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleClickMenu = () => {
    setOpenMenu(!openMenu);
  };
  const handlePageHome = () => {
    dispatch(currentPage("Home"));
  };
  return (
    <>
      <MenuWrapper onClick={handleClickMenu}>
        <span className={`menu-icon ${openMenu ? "active" : ""}`}></span>
      </MenuWrapper>
      {openMenu ? (
        <MenuSidebar>
          <SidebarNav>
            {currentPageReducer === "Home" ? (
              <SelectedItem onClick={handlePageHome}>
                <NavLink>Home</NavLink>
              </SelectedItem>
            ) : (
              <NavItemWrapper onClick={handlePageHome}>
                <NavItem href="/">Home</NavItem>
              </NavItemWrapper>
            )}
            {currentPageReducer === "Question" ? (
              <SelectedItem>
                <NavLink>Questions</NavLink>
                <FaGlobeAsia />
              </SelectedItem>
            ) : (
              <NavItemWrapper>
                <NavItem>
                  <Itemflex>Questions</Itemflex>
                  <FaGlobeAsia />
                </NavItem>
              </NavItemWrapper>
            )}
            {currentPageReducer === "Tags" ? (
              <SelectedItem>
                <NavLink>Tags</NavLink>
              </SelectedItem>
            ) : (
              <NavItemWrapper>
                <NavItem>Tags</NavItem>
              </NavItemWrapper>
            )}
            {currentPageReducer === "Users" ? (
              <SelectedItem>
                <NavLink>Users</NavLink>
              </SelectedItem>
            ) : (
              <NavItemWrapper>
                <NavItem>Users</NavItem>
              </NavItemWrapper>
            )}
          </SidebarNav>
        </MenuSidebar>
      ) : (
        <MenuSidebar display="none"></MenuSidebar>
      )}
    </>
  );
}

export default MenuSideBar;