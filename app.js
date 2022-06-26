"use strict";

// VARIABLES
const locators = {
  siteContainer: document.querySelector(".site-content"),
  hero: document.querySelector(".hero"),
  footer: document.querySelector(".futer"),
  mobileNav: document.querySelector(".nav-mobile"),
  navLinks: document.querySelectorAll(".navbar-list__link"),
  mobileNavLinks: document.querySelectorAll(".mobile-link"),
  submenu: document.querySelector(".submenu"),
  zaNasDropdown: document.querySelector("#za-nas-dropdown"),
  zaNasArrowRight: document.querySelector("#za-nas-arrow__right"),
  investiciiDropdown: document.querySelector("#investicii-dropdown"),
  investiciiArrowLeft: document.querySelector("#investicii-arrow__left"),
  investiciiArrowRight: document.querySelector("#investicii-arrow__right"),
  razvojDropdown: document.querySelector("#razvoj-dropdown"),
  razvojArrowLeft: document.querySelector("#razvoj-arrow__left"),
  razvojArrowRight: document.querySelector("#razvoj-arrow__right"),
  karieraDropdown: document.querySelector("#kariera-dropdown"),
  karieraArrowLeft: document.querySelector("#kariera-arrow__left"),
  karieraArrowRight: document.querySelector("#kariera-arrow__right"),
  presCentarDropdown: document.querySelector("#pres-centar-dropdown"),
  presCentarArrowLeft: document.querySelector("#pres-centar-arrow__left"),
  hamburger: document.querySelector(".hamburger"),
  hamburgerLines: document.querySelectorAll(".hamburger-line"),
  languageSwitch: document.querySelectorAll(".language-switch"),
};

const containerWidth = getComputedStyle(document.documentElement, null)
  .getPropertyValue("--container-width")
  .slice(0, -2);

// HELPER FUNCTIONS
const checkActive = (element) => {
  return element.classList.contains("active");
};

const addActive = (element) => {
  element.classList.add("active");
};

const removeActive = (element) => {
  element.classList.remove("active");
};

const checkIsLink = (element) => {
  return element.classList.contains("navbar-list__link");
};

const checkIsSubMenu = (element) => {
  return element.classList.contains("submenu");
};

const checkIsArrow = (element) => {
  return element.classList.contains("submenu__arrow");
};

const checkLanguageLinks = () => {
  const currentURL = window.location.href;
  const pageIsInEnglish = currentURL.includes("/en/");
  const languageSwitchers = locators.languageSwitch;

  languageSwitchers.forEach((switcher) => {
    if (pageIsInEnglish) {
      const engToMkd = currentURL.replace("/en/", "/");

      switcher.style.backgroundImage = `url(../img/mk.png)`;
      switcher.setAttribute("href", engToMkd);
    } else {
      const lastOccuringForwardSlashIndex = currentURL.lastIndexOf("/");
      const mkdToEng =
        currentURL.substring(0, lastOccuringForwardSlashIndex) +
        "/en/" +
        currentURL.substring(lastOccuringForwardSlashIndex + 1);

      switcher.style.backgroundImage = `url(./img/en.png)`;
      switcher.setAttribute("href", mkdToEng);
    }
  });
};
checkLanguageLinks();

// LISTENERS

// GLOBAL LISTENER
addEventListener("click", (event) => {
  let x = event.clientX;
  let y = event.clientY;
  const elementAtCursor = document.elementFromPoint(x, y);

  if (!checkIsLink(elementAtCursor)) {
    removeLinksActive();
  } else {
    if (checkActive(elementAtCursor)) {
      hideSubMenu();
      setTimeout(() => {
        removeLinksActive();
      }, 300);
    } else {
      removeLinksActive();
      addActive(elementAtCursor);
      setSubMenu(elementAtCursor);
      showSubMenu();
    }
  }

  if (
    !checkIsLink(elementAtCursor) &&
    !checkIsSubMenu(elementAtCursor) &&
    !checkIsArrow(elementAtCursor)
  ) {
    hideSubMenu();
  }
});

locators.hamburger.addEventListener("click", () => {
  toggleHamburger();
});

locators.mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (checkActive(link)) {
      removeActive(link);
      closeSubmenuMobile(link.nextElementSibling);
    } else {
      addActive(link);
      openSubmenuMobile(link.nextElementSibling);
    }
  });
});

// DROPDOWN LISTENERS
locators.zaNasArrowRight.addEventListener("click", () => {
  setDropdownsPosition(
    containerWidth * -1,
    0,
    containerWidth,
    containerWidth * 2,
    containerWidth * 3,
    containerWidth * 4
  );
});

locators.investiciiArrowLeft.addEventListener("click", () => {
  setDropdownsPosition(
    0,
    containerWidth,
    containerWidth * 2,
    containerWidth * 3,
    containerWidth * 4,
    0
  );
});

locators.investiciiArrowRight.addEventListener("click", () => {
  setDropdownsPosition(
    containerWidth * -2,
    containerWidth * -1,
    0,
    containerWidth,
    containerWidth * 2,
    2
  );
});

locators.razvojArrowLeft.addEventListener("click", () => {
  setDropdownsPosition(
    containerWidth * -1,
    0,
    containerWidth,
    containerWidth * 2,
    containerWidth * 3,
    1
  );
});

locators.razvojArrowRight.addEventListener("click", () => {
  setDropdownsPosition(
    containerWidth * -3,
    containerWidth * -2,
    containerWidth * -1,
    0,
    containerWidth,
    3
  );
});

locators.karieraArrowLeft.addEventListener("click", () => {
  setDropdownsPosition(
    containerWidth * -2,
    containerWidth * -1,
    0,
    containerWidth,
    containerWidth * 2,
    2
  );
});

locators.karieraArrowRight.addEventListener("click", () => {
  setDropdownsPosition(
    containerWidth * -4,
    containerWidth * -3,
    containerWidth * -2,
    containerWidth * -1,
    0,
    4
  );
});

locators.presCentarArrowLeft.addEventListener("click", () => {
  setDropdownsPosition(
    containerWidth * -3,
    containerWidth * -2,
    containerWidth * -1,
    0,
    containerWidth,
    3
  );
});

// METHODS
const removeLinksActive = () => {
  locators.navLinks.forEach((link) => {
    removeActive(link);
  });
};

const showSearchBar = () => {
  addActive(locators.searchBar);
  locators.searchBar.focus();
};

const hideSearchBar = () => {
  removeActive(locators.searchBar);
  locators.searchBar.value = "";
};

const showSubMenu = () => {
  addActive(locators.submenu);
};

const hideSubMenu = () => {
  removeActive(locators.submenu);
};

//MOBILE METHODS
const showMobileMenu = () => {
  addActive(locators.mobileNav);
  locators.siteContainer.classList.add("offset");
};

const hideMobileMenu = () => {
  removeActive(locators.mobileNav);
  locators.siteContainer.classList.remove("offset");
};

const toggleHamburger = () => {
  if (checkActive(locators.hamburger)) {
    removeActive(locators.hamburger);
    locators.hamburgerLines.forEach((line) => {
      removeActive(line);
    });
    hideMobileMenu();
  } else {
    addActive(locators.hamburger);
    locators.hamburgerLines.forEach((line) => {
      addActive(line);
    });
    showMobileMenu();
  }
};

//DROPDOWN METHODS
const openSubmenuMobile = (submenu) => {
  submenu.style.display = "block";

  setTimeout(() => {
    addActive(submenu);
  }, 50);
};

const closeSubmenuMobile = (submenu) => {
  removeActive(submenu);

  setTimeout(() => {
    submenu.style.display = "none";
  }, 200);
};

const setSubMenu = (link) => {
  switch (link.innerHTML.toLowerCase().trim()) {
    case "за нас":
      setDropdownFromLink(
        0,
        containerWidth,
        containerWidth * 2,
        containerWidth * 3,
        containerWidth * 4
      );
      break;
    case "about us":
      setDropdownFromLink(
        0,
        containerWidth,
        containerWidth * 2,
        containerWidth * 3,
        containerWidth * 4
      );
      break;

    case "инвестиции":
      setDropdownFromLink(
        containerWidth * -1,
        0,
        containerWidth,
        containerWidth * 2,
        containerWidth * 3
      );
      break;
    case "investments":
      setDropdownFromLink(
        containerWidth * -1,
        0,
        containerWidth,
        containerWidth * 2,
        containerWidth * 3
      );
      break;

    case "одржлив развој":
      setDropdownFromLink(
        containerWidth * -2,
        containerWidth * -1,
        0,
        containerWidth,
        containerWidth * 2
      );
      break;
    case "sustainable development":
      setDropdownFromLink(
        containerWidth * -2,
        containerWidth * -1,
        0,
        containerWidth,
        containerWidth * 2
      );
      break;

    case "кариера":
      setDropdownFromLink(
        containerWidth * -3,
        containerWidth * -2,
        containerWidth * -1,
        0,
        containerWidth
      );
      break;
    case "career":
      setDropdownFromLink(
        containerWidth * -3,
        containerWidth * -2,
        containerWidth * -1,
        0,
        containerWidth
      );
      break;

    case "прес центар":
      setDropdownFromLink(
        containerWidth * -4,
        containerWidth * -3,
        containerWidth * -2,
        containerWidth * -1,
        0
      );
      break;
    case "press center":
      setDropdownFromLink(
        containerWidth * -4,
        containerWidth * -3,
        containerWidth * -2,
        containerWidth * -1,
        0
      );
      break;

    default:
      break;
  }
};

const setDropdownFromLink = (
  offsetZaNas,
  offsetInvesticii,
  offsetRazvoj,
  offsetKariera,
  offsetPresCentar
) => {
  locators.zaNasDropdown.style.transform = `translateX(${offsetZaNas}px)`;
  locators.investiciiDropdown.style.transform = `translateX(${offsetInvesticii}px)`;
  locators.razvojDropdown.style.transform = `translateX(${offsetRazvoj}px)`;
  locators.karieraDropdown.style.transform = `translateX(${offsetKariera}px)`;
  locators.presCentarDropdown.style.transform = `translateX(${offsetPresCentar}px)`;
};

const setDropdownsPosition = (
  offsetZaNas,
  offsetInvesticii,
  offsetRazvoj,
  offsetKariera,
  offsetPresCentar,
  activeLink
) => {
  console.log(
    offsetZaNas,
    offsetInvesticii,
    offsetRazvoj,
    offsetKariera,
    offsetPresCentar,
    activeLink
  );

  locators.zaNasDropdown.style.transform = `translateX(${offsetZaNas}px)`;
  locators.investiciiDropdown.style.transform = `translateX(${offsetInvesticii}px)`;
  locators.razvojDropdown.style.transform = `translateX(${offsetRazvoj}px)`;
  locators.karieraDropdown.style.transform = `translateX(${offsetKariera}px)`;
  locators.presCentarDropdown.style.transform = `translateX(${offsetPresCentar}px)`;

  setTimeout(() => {
    addActive(locators.navLinks[activeLink]);
  }, 250);
};
