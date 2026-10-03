function escapeHTML(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function renderModules() {

    const container =
        document.getElementById("moduleCards");

    if (!container) return;

    container.innerHTML =
        courseModules.map(module => {

            return `

            <div class="module-card">

                <span class="badge">
                    Module ${module.id}
                </span>

                <h2>
                    ${module.title}
                </h2>

                <p>
                    ${module.hours} Hours
                </p>

                <p>
                    ${module.topics
                        .slice(0,5)
                        .join(" • ")}
                </p>

                <a
                    class="btn"
                    href="modules/module${module.id}.html">

                    Open Module

                </a>

                <a
                    class="btn secondary"
                    href="quiz.html?module=${module.id}">

                    Take Quiz

                </a>

            </div>

            `;

        }).join("");
}


function renderAssignments() {

    const container =
        document.getElementById("assignmentList");

    if (!container) return;

    container.innerHTML =
        assignments.map(a => {

            return `

            <div class="content-card">

                <h2>
                    Module ${a.module}:
                    ${a.title}
                </h2>

                <ol>

                    ${a.tasks.map(task =>

                        `<li>${escapeHTML(task)}</li>`

                    ).join("")}

                </ol>

            </div>

            `;

        }).join("");
}


function renderPrograms() {

    const container =
        document.getElementById("programList");

    if (!container) return;

    container.innerHTML =
        programs.map(program => {

            return `

            <div class="content-card">

                <h2>
                    ${escapeHTML(program.title)}
                </h2>

                <pre><code>${escapeHTML(program.code)}</code></pre>

            </div>

            `;

        }).join("");
}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderModules();
        renderAssignments();
        renderPrograms();

        const coList =
            document.getElementById("coList");

        if (coList) {

            coList.innerHTML =
                courseOutcomes.map(
                    co => `<li>${escapeHTML(co)}</li>`
                ).join("");
        }

    }
);