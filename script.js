const projects = {
  pest: {
    type: "AI / COMPUTER VISION / FIELD MONITORING",
    title: "AI Bug Detection System",
    description: "Contributed to an AI-assisted insect and pest detection workflow for agricultural monitoring with the Philippine Rice Institute.",
    role: "Detection workflow",
    output: "Agricultural monitoring"
  },
  water: {
    type: "IOT / IRRIGATION / DECISION SUPPORT",
    title: "Water Intelligence Systems",
    description: "Developed tensiometer-based irrigation and crop water stress monitoring concepts that turn field conditions into practical irrigation decisions.",
    role: "Sensor integration",
    output: "Irrigation decisions"
  },
  vision: {
    type: "DRONES / GIS / DATA VISUALIZATION",
    title: "Aerial Crop Health Analysis",
    description: "Developed a workflow for drone-based crop-health monitoring, field visualization, and interpretation of aerial data for farm management.",
    role: "Analysis workflow",
    output: "Field visualization"
  },
  solar: {
    type: "SOLAR PV / STORAGE / FIELD OPERATIONS",
    title: "Hybrid Solar Project Delivery",
    description: "Supports residential and small-commercial projects across system sizing, inverter and battery selection, installation coordination, documentation, and after-sales care.",
    role: "6–12 kW systems",
    output: "End-to-end support"
  }
};

const menuToggle = document.querySelector(".menu-toggle");
const projectDisplay = document.querySelector("#project-display");
const title = document.querySelector("#project-title");
const description = document.querySelector("#project-description");
const type = document.querySelector(".project-type");
const role = document.querySelector("#project-role");
const output = document.querySelector("#project-output");

menuToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("#site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll(".project-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const project = projects[tab.dataset.project];
    document.querySelectorAll(".project-tab").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    projectDisplay.classList.add("switching");
    setTimeout(() => {
      projectDisplay.dataset.theme = tab.dataset.project;
      type.textContent = project.type;
      title.textContent = project.title;
      description.textContent = project.description;
      role.textContent = project.role;
      output.textContent = project.output;
      projectDisplay.classList.remove("switching");
    }, 180);
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const counter = entry.target;
    const target = Number(counter.dataset.count);
    const start = performance.now();
    const duration = 900;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      counter.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    countObserver.unobserve(counter);
  });
}, { threshold: 0.8 });

document.querySelectorAll("[data-count]").forEach((counter) => countObserver.observe(counter));

if (window.matchMedia("(pointer: fine)").matches) {
  const glow = document.querySelector(".cursor-glow");
  window.addEventListener("pointermove", (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });
}

document.querySelector("#year").textContent = new Date().getFullYear();
