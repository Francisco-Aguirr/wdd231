document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const currentYear = document.getElementById("currentyear");
    const lastModified = document.getElementById("lastModified");
    const coursesContainer = document.getElementById("courses-container");
    const totalCreditsSpan = document.getElementById("total-credits");
    const courseButtons = document.querySelectorAll("#course-filters button");

    // Responsive menu toggle
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });

    // Set current year dynamically
    currentYear.textContent = new Date().getFullYear();
    
    // Set last modified date dynamically
    lastModified.textContent = "Last Modified: " + document.lastModified;

    // Course data
    const courses = [
        { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: false },
        { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: false },
        { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: false },
        { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false },
        { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: false },
        { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: false }
    ];

    // Mark some courses as completed
    courses.forEach(course => {
        if (course.number === 110 || course.number === 131) {
            course.completed = true;
        }
    });

    // Function to render courses
    function displayCourses(filter = "all") {
        coursesContainer.innerHTML = "";
        let totalCredits = 0;

        const filteredCourses = courses.filter(course => filter === "all" || course.subject === filter);

        filteredCourses.forEach(course => {
            const courseDiv = document.createElement("div");
            courseDiv.classList.add("course");
            if (course.completed) courseDiv.classList.add("completed");
            
            courseDiv.innerHTML = `<strong>${course.subject} ${course.number}</strong><br>${course.title} (${course.credits} credits)`;
            coursesContainer.appendChild(courseDiv);
            totalCredits += course.credits;
        });

        totalCreditsSpan.textContent = totalCredits;
    }

    // Display all courses initially
    displayCourses();

    // Filter courses on button click
    courseButtons.forEach(button => {
        button.addEventListener("click", () => {
            displayCourses(button.dataset.filter);
        });
    });
});
