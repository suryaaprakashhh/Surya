document.addEventListener("DOMContentLoaded", function () {
	// Dark Mode Toggle
	const darkModeToggle = document.getElementById("dark-mode-toggle");
	const darkModeIcon = darkModeToggle.querySelector("i");

	// Check for saved user preference
	if (localStorage.getItem("darkMode") === "true") {
		document.body.classList.add("dark-mode");
		darkModeIcon.classList.replace("fa-moon", "fa-sun");
	}

	darkModeToggle.addEventListener("click", () => {
		document.body.classList.toggle("dark-mode");

		if (document.body.classList.contains("dark-mode")) {
			darkModeIcon.classList.replace("fa-moon", "fa-sun");
			localStorage.setItem("darkMode", "true");
		} else {
			darkModeIcon.classList.replace("fa-sun", "fa-moon");
			localStorage.setItem("darkMode", "false");
		}
	});

	// Smooth Scrolling
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();

			const targetId = this.getAttribute("href");
			const targetElement = document.querySelector(targetId);

			if (targetElement) {
				window.scrollTo({
					top: targetElement.offsetTop - 80,
					behavior: "smooth",
				});

				// Update URL without page reload
				if (history.pushState) {
					history.pushState(null, null, targetId);
				} else {
					window.location.hash = targetId;
				}
			}
		});
	});

	// Project Filter
	const filterButtons = document.querySelectorAll(".filter-btn");
	const projectCards = document.querySelectorAll(".project-card");

	filterButtons.forEach((button) => {
		button.addEventListener("click", () => {
			// Update active button
			filterButtons.forEach((btn) => btn.classList.remove("active"));
			button.classList.add("active");

			const filterValue = button.getAttribute("data-filter");

			// Filter projects
			projectCards.forEach((card) => {
				if (
					filterValue === "all" ||
					card.getAttribute("data-category") === filterValue
				) {
					card.style.display = "block";
				} else {
					card.style.display = "none";
				}
			});
		});
	});

	// Back to Top Button
	const backToTopButton = document.querySelector(".back-to-top");

	window.addEventListener("scroll", () => {
		if (window.pageYOffset > 300) {
			backToTopButton.classList.add("active");
		} else {
			backToTopButton.classList.remove("active");
		}
	});

	backToTopButton.addEventListener("click", () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});

	// Form Validation
	const contactForm = document.getElementById("contact-form");

	if (contactForm) {
		contactForm.addEventListener("submit", function (e) {
			e.preventDefault();

			// Get form values
			const name = document.getElementById("name").value.trim();
			const email = document.getElementById("email").value.trim();
			const message = document.getElementById("message").value.trim();

			// Simple validation
			if (!name || !email || !message) {
				alert("Please fill in all required fields");
				return;
			}

			if (!validateEmail(email)) {
				alert("Please enter a valid email address");
				return;
			}

			// Here you would typically send the form data to a server
			// For now, we'll just show a success message
			alert("Thank you for your message! I will get back to you soon.");
			contactForm.reset();
		});
	}

	// Email validation function
	function validateEmail(email) {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	}

	// Animate elements when scrolling
	const animateOnScroll = () => {
		const elements = document.querySelectorAll(
			".about-content, .project-card, .skills-category, .education-item, .contact-info, .contact-form"
		);

		elements.forEach((element) => {
			const elementPosition = element.getBoundingClientRect().top;
			const screenPosition = window.innerHeight / 1.3;

			if (elementPosition < screenPosition) {
				element.style.opacity = "1";
				element.style.transform = "translateY(0)";
			}
		});
	};

	// Set initial state for animation
	document
		.querySelectorAll(
			".about-content, .project-card, .skills-category, .education-item, .contact-info, .contact-form"
		)
		.forEach((element) => {
			element.style.opacity = "0";
			element.style.transform = "translateY(20px)";
			element.style.transition = "all 0.6s ease";
		});

	// Run once on page load
	animateOnScroll();

	// Run on scroll
	window.addEventListener("scroll", animateOnScroll);

	// Mobile menu toggle (if you add a mobile menu later)
	const mobileMenuToggle = document.createElement("button");
	mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
	mobileMenuToggle.classList.add("mobile-menu-toggle");
	document.querySelector("header .container").appendChild(mobileMenuToggle);

	mobileMenuToggle.addEventListener("click", () => {
		document.querySelector("nav ul").classList.toggle("active");
	});
});
