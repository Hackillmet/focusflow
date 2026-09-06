document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       TELEGRAM MINI APP
    ===================================================== */

    const tg = window.Telegram?.WebApp || null;

    if (tg) {
        tg.ready();
        tg.expand();

        try {
            tg.setHeaderColor("#050505");
            tg.setBackgroundColor("#050505");
        } catch (error) {
            console.log("Telegram theme setup skipped");
        }
    }


    /* =====================================================
       STORAGE
    ===================================================== */

    function loadJSON(key, fallback) {
        try {
            const value = localStorage.getItem(key);

            if (!value) {
                return fallback;
            }

            return JSON.parse(value);

        } catch (error) {
            console.error("Storage error:", error);
            return fallback;
        }
    }


    function saveJSON(key, value) {
        localStorage.setItem(
            key,
            JSON.stringify(value)
        );
    }


    /* =====================================================
       STATE
    ===================================================== */

    let language =
        localStorage.getItem("focusflowLanguage") || "ru";

    let theme =
        localStorage.getItem("focusflowTheme") || "dark";


    let notes =
        loadJSON("focusflowNotes", []);


    let categories =
        loadJSON("focusflowCategories", [
            {
                id: "programming",
                name: "Программирование",
                icon: "💻"
            },
            {
                id: "school",
                name: "Школа",
                icon: "📚"
            }
        ]);


    let sessions =
        loadJSON("focusflowSessions", []);


    let tasks =
        loadJSON("focusflowTasks", []);


    let selectedCategoryId =
        localStorage.getItem(
            "focusflowSelectedCategory"
        ) ||
        categories[0]?.id ||
        null;


    /* =====================================================
       TRANSLATIONS
    ===================================================== */

    const translations = {

        ru: {

            subtitle:
                "Твой личный трекер продуктивности",

            notes:
                "Заметки",

            notesDesc:
                "Сохраняй важные мысли и идеи",

            add:
                "Добавить",

            search:
                "Поиск заметок...",

            noNotes:
                "Пока нет заметок",

            createFirstNote:
                "Создай свою первую заметку",


            activity:
                "Активность",

            activityDesc:
                "Твои занятия по дням",

            noActivity:
                "Нет активности",

            someActivity:
                "Есть активность",

            goodActivity:
                "Много активности",

            dayStats:
                "Статистика дня",


            tasks:
                "Задачи",

            tasksDesc:
                "Отмечай то, что сделал",

            noTasks:
                "Задач пока нет",


            progress:
                "Прогресс",

            progressDesc:
                "Следи за своим временем",

            today:
                "Сегодня",

            completed:
                "выполнено",


            timer:
                "Таймер",

            timerDesc:
                "Запиши своё занятие",

            chooseActivity:
                "Выбери занятие",

            manage:
                "Управлять",

            newActivity:
                "Новое занятие",


            start:
                "Начать",

            stop:
                "Стоп",


            statistics:
                "Статистика",

            statisticsDesc:
                "Сколько времени ты потратил",


            week:
                "Неделя",

            weekDesc:
                "Активность за последние 7 дней",


            settings:
                "Настройки",

            language:
                "Язык",

            theme:
                "Тема",

            dark:
                "Тёмная",

            light:
                "Светлая",

            danger:
                "Опасная зона",

            reset:
                "Сбросить все данные",


            save:
                "Сохранить",

            cancel:
                "Отмена",


            activityName:
                "Название занятия",

            activityIcon:
                "Иконка",


            manageActivities:
                "Мои занятия",


            saveSession:
                "Сохранить занятие?",


            newTask:
                "Новая задача",


            ready:
                "ГОТОВ",

            running:
                "ИДЁТ",


            noCategories:
                "Нет занятий",


            delete:
                "Удалить",


            total:
                "Всего",

            minutes:
                "мин",


            confirmReset:
                "Точно удалить все заметки, задачи, занятия и статистику?",


            categoryExists:
                "Такое занятие уже существует",


            enterCategory:
                "Введите название занятия",


            enterTask:
                "Введите задачу",


            selectCategory:
                "Сначала выбери занятие"

        },


        en: {

            subtitle:
                "Your personal productivity tracker",

            notes:
                "Notes",

            notesDesc:
                "Save important thoughts and ideas",

            add:
                "Add",

            search:
                "Search notes...",

            noNotes:
                "No notes yet",

            createFirstNote:
                "Create your first note",


            activity:
                "Activity",

            activityDesc:
                "Your activities by day",

            noActivity:
                "No activity",

            someActivity:
                "Some activity",

            goodActivity:
                "High activity",

            dayStats:
                "Day statistics",


            tasks:
                "Tasks",

            tasksDesc:
                "Check what you have completed",

            noTasks:
                "No tasks yet",


            progress:
                "Progress",

            progressDesc:
                "Track your time",

            today:
                "Today",

            completed:
                "completed",


            timer:
                "Timer",

            timerDesc:
                "Record your activity",

            chooseActivity:
                "Choose activity",

            manage:
                "Manage",

            newActivity:
                "New activity",


            start:
                "Start",

            stop:
                "Stop",


            statistics:
                "Statistics",

            statisticsDesc:
                "How much time you spent",


            week:
                "Week",

            weekDesc:
                "Activity over the last 7 days",


            settings:
                "Settings",

            language:
                "Language",

            theme:
                "Theme",

            dark:
                "Dark",

            light:
                "Light",

            danger:
                "Danger zone",

            reset:
                "Reset all data",


            save:
                "Save",

            cancel:
                "Cancel",


            activityName:
                "Activity name",

            activityIcon:
                "Icon",


            manageActivities:
                "My activities",


            saveSession:
                "Save session?",


            newTask:
                "New task",


            ready:
                "READY",

            running:
                "RUNNING",


            noCategories:
                "No activities",


            delete:
                "Delete",


            total:
                "Total",

            minutes:
                "min",


            confirmReset:
                "Delete all notes, tasks, activities and statistics?",


            categoryExists:
                "This activity already exists",


            enterCategory:
                "Enter activity name",


            enterTask:
                "Enter a task",


            selectCategory:
                "First choose an activity"

        }

    };


    function t(key) {

        return (
            translations[language]?.[key] ||
            key
        );

    }


    /* =====================================================
       TELEGRAM USER
    ===================================================== */

    const telegramUser =
        tg?.initDataUnsafe?.user || null;


    if (telegramUser) {

        console.log(
            "Telegram user:",
            telegramUser.first_name
        );

    }


    /* =====================================================
       THEME
    ===================================================== */

    function applyTheme() {

        if (theme === "light") {

            document.body.classList.add("light");

        } else {

            document.body.classList.remove("light");

        }


        if (tg) {

            try {

                tg.setHeaderColor(
                    theme === "light"
                        ? "#f2f2f2"
                        : "#050505"
                );

                tg.setBackgroundColor(
                    theme === "light"
                        ? "#f2f2f2"
                        : "#050505"
                );

            } catch (error) {
                console.log(
                    "Telegram colors unavailable"
                );
            }

        }


        updateSettingsButtons();

        localStorage.setItem(
            "focusflowTheme",
            theme
        );

    }


    function updateSettingsButtons() {

        document
            .querySelectorAll(
                ".setting-choice[data-language]"
            )
            .forEach(button => {

                button.classList.toggle(
                    "active",
                    button.dataset.language === language
                );

            });


        document
            .getElementById("darkThemeBtn")
            ?.classList.toggle(
                "active",
                theme === "dark"
            );


        document
            .getElementById("lightThemeBtn")
            ?.classList.toggle(
                "active",
                theme === "light"
            );

    }


    /* =====================================================
       LANGUAGE
    ===================================================== */

    function applyLanguage() {

        document
            .querySelectorAll("[data-i18n]")
            .forEach(element => {

                const key =
                    element.dataset.i18n;

                if (
                    translations[language]?.[key]
                ) {

                    element.textContent =
                        translations[language][key];

                }

            });


        document
            .querySelectorAll("[data-placeholder]")
            .forEach(element => {

                const key =
                    element.dataset.placeholder;

                if (
                    translations[language]?.[key]
                ) {

                    element.placeholder =
                        translations[language][key];

                }

            });


        document.documentElement.lang =
            language;


        localStorage.setItem(
            "focusflowLanguage",
            language
        );


        updateSettingsButtons();


        renderNotes();
        renderCalendar();
        renderDayStats();
        renderTasks();
        renderCategories();
        renderStatistics();
        renderWeeklyChart();
        updateProgress();

    }


    /* =====================================================
       NAVIGATION
    ===================================================== */

    document
        .querySelectorAll(".nav-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const pageId =
                        button.dataset.page;


                    document
                        .querySelectorAll(".page")
                        .forEach(page => {

                            page.classList.remove(
                                "active"
                            );

                        });


                    const page =
                        document.getElementById(
                            pageId
                        );


                    if (page) {

                        page.classList.add(
                            "active"
                        );

                    }


                    document
                        .querySelectorAll(".nav-btn")
                        .forEach(btn => {

                            btn.classList.remove(
                                "active"
                            );

                        });


                    button.classList.add(
                        "active"
                    );


                    if (
                        pageId ===
                        "activityPage"
                    ) {

                        renderCalendar();
                        renderDayStats();
                        renderTasks();

                    }


                    if (
                        pageId ===
                        "progressPage"
                    ) {

                        renderCategories();
                        renderStatistics();
                        renderWeeklyChart();
                        updateProgress();

                    }

                }
            );

        });


    /* =====================================================
       MODALS
    ===================================================== */

    function openModal(id) {

        document
            .getElementById(id)
            ?.classList.add("show");

    }


    function closeModal(id) {

        document
            .getElementById(id)
            ?.classList.remove("show");

    }


    document
        .querySelectorAll("[data-close]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    closeModal(
                        button.dataset.close
                    );

                }
            );

        });


    document
        .querySelectorAll(".modal")
        .forEach(modal => {

            modal.addEventListener(
                "click",
                event => {

                    if (
                        event.target === modal
                    ) {

                        modal.classList.remove(
                            "show"
                        );

                    }

                }
            );

        });


    /* =====================================================
       NOTES
    ===================================================== */

    let editingNoteId = null;


    document
        .getElementById("addNoteBtn")
        .addEventListener(
            "click",
            () => {

                editingNoteId = null;


                document.getElementById(
                    "noteModalTitle"
                ).textContent =
                    language === "ru"
                        ? "Новая заметка"
                        : "New note";


                document.getElementById(
                    "noteTitle"
                ).value = "";


                document.getElementById(
                    "noteText"
                ).value = "";


                openModal(
                    "noteModal"
                );

            }
        );


    document
        .getElementById("saveNoteBtn")
        .addEventListener(
            "click",
            () => {

                const title =
                    document.getElementById(
                        "noteTitle"
                    ).value.trim();


                const text =
                    document.getElementById(
                        "noteText"
                    ).value.trim();


                if (!title && !text) {
                    return;
                }


                if (editingNoteId) {

                    const note =
                        notes.find(
                            item =>
                                item.id ===
                                editingNoteId
                        );


                    if (note) {

                        note.title =
                            title;

                        note.text =
                            text;

                        note.updatedAt =
                            Date.now();

                    }

                } else {

                    notes.unshift({

                        id:
                            Date.now().toString(),

                        title,

                        text,

                        createdAt:
                            Date.now()

                    });

                }


                saveJSON(
                    "focusflowNotes",
                    notes
                );


                renderNotes();

                closeModal(
                    "noteModal"
                );

            }
        );


    function renderNotes() {

        const list =
            document.getElementById(
                "notesList"
            );


        const empty =
            document.getElementById(
                "emptyNotes"
            );


        const search =
            document
                .getElementById(
                    "searchInput"
                )
                .value
                .toLowerCase()
                .trim();


        const filtered =
            notes.filter(note => {

                return (

                    String(
                        note.title || ""
                    )
                        .toLowerCase()
                        .includes(search)

                    ||

                    String(
                        note.text || ""
                    )
                        .toLowerCase()
                        .includes(search)

                );

            });


        list.innerHTML = "";


        empty.style.display =
            filtered.length === 0
                ? "block"
                : "none";


        filtered.forEach(note => {

            const article =
                document.createElement(
                    "article"
                );


            article.className =
                "note";


            article.innerHTML = `

                <div class="note-top">

                    <div>

                        <div class="note-title">
                            ${escapeHTML(
                                note.title || ""
                            )}
                        </div>

                        <div class="note-text">
                            ${escapeHTML(
                                note.text || ""
                            )}
                        </div>

                    </div>

                    <div class="note-actions">

                        <button
                            data-edit="${note.id}"
                            aria-label="Edit"
                        >
                            ✏️
                        </button>

                        <button
                            data-delete="${note.id}"
                            aria-label="Delete"
                        >
                            🗑️
                        </button>

                    </div>

                </div>

                <div class="note-date">
                    ${formatDate(
                        note.updatedAt ||
                        note.createdAt
                    )}
                </div>

            `;


            list.appendChild(
                article
            );

        });


        list
            .querySelectorAll("[data-edit]")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const note =
                            notes.find(
                                item =>
                                    item.id ===
                                    button.dataset.edit
                            );


                        if (!note) return;


                        editingNoteId =
                            note.id;


                        document.getElementById(
                            "noteTitle"
                        ).value =
                            note.title || "";


                        document.getElementById(
                            "noteText"
                        ).value =
                            note.text || "";


                        document.getElementById(
                            "noteModalTitle"
                        ).textContent =
                            language === "ru"
                                ? "Редактировать заметку"
                                : "Edit note";


                        openModal(
                            "noteModal"
                        );

                    }
                );

            });


        list
            .querySelectorAll("[data-delete]")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        notes =
                            notes.filter(
                                note =>
                                    note.id !==
                                    button.dataset.delete
                            );


                        saveJSON(
                            "focusflowNotes",
                            notes
                        );


                        renderNotes();

                    }
                );

            });

    }


    document
        .getElementById("searchInput")
        .addEventListener(
            "input",
            renderNotes
        );


    /* =====================================================
       CATEGORIES
    ===================================================== */

    function renderCategories() {

        const container =
            document.getElementById(
                "timerCategories"
            );


        container.innerHTML = "";


        if (categories.length === 0) {

            container.innerHTML = `
                <div class="empty-small">
                    ${t("noCategories")}
                </div>
            `;

            return;

        }


        categories.forEach(category => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "category-btn";


            if (
                category.id ===
                selectedCategoryId
            ) {

                button.classList.add(
                    "selected"
                );

            }


            button.innerHTML =
                `${escapeHTML(
                    category.icon
                )} ${escapeHTML(
                    category.name
                )}`;


            button.addEventListener(
                "click",
                () => {

                    if (timerRunning) {
                        return;
                    }


                    selectedCategoryId =
                        category.id;


                    localStorage.setItem(
                        "focusflowSelectedCategory",
                        selectedCategoryId
                    );


                    renderCategories();

                }
            );


            container.appendChild(
                button
            );

        });

    }


    /* =====================================================
       ADD CATEGORY
    ===================================================== */

    function openCategoryModal() {

        document.getElementById(
            "categoryName"
        ).value = "";


        document.getElementById(
            "categoryIcon"
        ).value = "📌";


        openModal(
            "categoryModal"
        );


        setTimeout(
            () => {

                document
                    .getElementById(
                        "categoryName"
                    )
                    .focus();

            },
            100
        );

    }


    document
        .getElementById("addCategoryBtn")
        .addEventListener(
            "click",
            openCategoryModal
        );


    document
        .getElementById("manageAddCategoryBtn")
        .addEventListener(
            "click",
            () => {

                closeModal(
                    "manageCategoryModal"
                );

                openCategoryModal();

            }
        );


    document
        .getElementById("saveCategoryBtn")
        .addEventListener(
            "click",
            () => {

                const name =
                    document
                        .getElementById(
                            "categoryName"
                        )
                        .value
                        .trim();


                let icon =
                    document
                        .getElementById(
                            "categoryIcon"
                        )
                        .value
                        .trim();


                if (!name) {

                    alert(
                        t("enterCategory")
                    );

                    return;

                }


                if (!icon) {
                    icon = "📌";
                }


                const exists =
                    categories.some(
                        category =>
                            category.name
                                .toLowerCase() ===
                            name.toLowerCase()
                    );


                if (exists) {

                    alert(
                        t("categoryExists")
                    );

                    return;

                }


                const category = {

                    id:
                        Date.now().toString(),

                    name,

                    icon

                };


                categories.push(
                    category
                );


                selectedCategoryId =
                    category.id;


                saveJSON(
                    "focusflowCategories",
                    categories
                );


                localStorage.setItem(
                    "focusflowSelectedCategory",
                    selectedCategoryId
                );


                renderCategories();

                closeModal(
                    "categoryModal"
                );

            }
        );


    /* =====================================================
       MANAGE CATEGORIES
    ===================================================== */

    document
        .getElementById(
            "manageCategoriesBtn"
        )
        .addEventListener(
            "click",
            () => {

                renderManageCategories();

                openModal(
                    "manageCategoryModal"
                );

            }
        );


    function renderManageCategories() {

        const container =
            document.getElementById(
                "manageCategoriesList"
            );


        container.innerHTML = "";


        if (categories.length === 0) {

            container.innerHTML = `
                <div class="empty-small">
                    ${t("noCategories")}
                </div>
            `;

            return;

        }


        categories.forEach(category => {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "manage-category";


            row.innerHTML = `

                <div class="manage-category-icon">
                    ${escapeHTML(
                        category.icon
                    )}
                </div>

                <div class="manage-category-name">
                    ${escapeHTML(
                        category.name
                    )}
                </div>

                <button
                    class="delete-category"
                    data-category-delete="${category.id}"
                    aria-label="${t("delete")}"
                >
                    🗑️
                </button>

            `;


            container.appendChild(
                row
            );

        });


        container
            .querySelectorAll(
                "[data-category-delete]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            button.dataset
                                .categoryDelete;


                        categories =
                            categories.filter(
                                category =>
                                    category.id !==
                                    id
                            );


                        saveJSON(
                            "focusflowCategories",
                            categories
                        );


                        if (
                            selectedCategoryId ===
                            id
                        ) {

                            selectedCategoryId =
                                categories[0]?.id ||
                                null;


                            localStorage.setItem(
                                "focusflowSelectedCategory",
                                selectedCategoryId ||
                                ""
                            );

                        }


                        renderManageCategories();
                        renderCategories();
                        renderStatistics();

                    }
                );

            });

    }


    /* =====================================================
       TIMER
    ===================================================== */

    let timerRunning = false;

    let timerStartTime = null;

    let timerInterval = null;

    let pendingSession = null;


    function updateTimerDisplay() {

        if (!timerStartTime) {

            document.getElementById(
                "timerDisplay"
            ).textContent =
                "00:00:00";

            return;

        }


        const elapsed =
            Math.floor(
                (
                    Date.now() -
                    timerStartTime
                ) / 1000
            );


        document.getElementById(
            "timerDisplay"
        ).textContent =
            formatTimer(
                elapsed
            );

    }


    function formatTimer(seconds) {

        const hours =
            Math.floor(
                seconds / 3600
            );


        const minutes =
            Math.floor(
                (seconds % 3600) / 60
            );


        const secs =
            seconds % 60;


        return [

            hours,
            minutes,
            secs

        ]
            .map(
                value =>
                    String(value)
                        .padStart(2, "0")
            )
            .join(":");

    }


    function startTimer() {

        if (!selectedCategoryId) {

            alert(
                t("selectCategory")
            );

            return;

        }


        if (timerRunning) {
            return;
        }


        timerRunning = true;

        timerStartTime =
            Date.now();


        document
            .getElementById(
                "timerStartBtn"
            )
            .classList.add(
                "hidden"
            );


        document
            .getElementById(
                "timerStopBtn"
            )
            .classList.remove(
                "hidden"
            );


        const status =
            document.getElementById(
                "timerStatus"
            );


        status.textContent =
            t("running");


        status.classList.add(
            "running"
        );


        timerInterval =
            setInterval(
                updateTimerDisplay,
                1000
            );


        updateTimerDisplay();

    }


    function stopTimer() {

        if (!timerRunning) {
            return;
        }


        clearInterval(
            timerInterval
        );


        timerInterval =
            null;


        const elapsedSeconds =
            Math.max(
                0,
                Math.floor(
                    (
                        Date.now() -
                        timerStartTime
                    ) / 1000
                )
            );


        timerRunning =
            false;


        document
            .getElementById(
                "timerStartBtn"
            )
            .classList.remove(
                "hidden"
            );


        document
            .getElementById(
                "timerStopBtn"
            )
            .classList.add(
                "hidden"
            );


        const status =
            document.getElementById(
                "timerStatus"
            );


        status.textContent =
            t("ready");


        status.classList.remove(
            "running"
        );


        const category =
            categories.find(
                item =>
                    item.id ===
                    selectedCategoryId
            );


        if (!category) {

            resetTimer();

            return;

        }


        pendingSession = {

            categoryId:
                category.id,

            seconds:
                elapsedSeconds,

            date:
                getDateKey(
                    new Date()
                )

        };


        document.getElementById(
            "sessionIcon"
        ).textContent =
            category.icon;


        document.getElementById(
            "sessionCategory"
        ).textContent =
            category.name;


        document.getElementById(
            "sessionTime"
        ).textContent =
            formatDuration(
                elapsedSeconds
            );


        openModal(
            "saveSessionModal"
        );

    }


    function resetTimer() {

        timerRunning =
            false;


        if (timerInterval) {

            clearInterval(
                timerInterval
            );

            timerInterval =
                null;

        }


        timerStartTime =
            null;


        document.getElementById(
            "timerDisplay"
        ).textContent =
            "00:00:00";


        document
            .getElementById(
                "timerStartBtn"
            )
            .classList.remove(
                "hidden"
            );


        document
            .getElementById(
                "timerStopBtn"
            )
            .classList.add(
                "hidden"
            );


        const status =
            document.getElementById(
                "timerStatus"
            );


        status.textContent =
            t("ready");


        status.classList.remove(
            "running"
        );

    }


    document
        .getElementById(
            "timerStartBtn"
        )
        .addEventListener(
            "click",
            startTimer
        );


    document
        .getElementById(
            "timerStopBtn"
        )
        .addEventListener(
            "click",
            stopTimer
        );


    /* =====================================================
       SAVE SESSION
    ===================================================== */

    document
        .getElementById(
            "saveSessionBtn"
        )
        .addEventListener(
            "click",
            () => {

                if (!pendingSession) {
                    return;
                }


                sessions.push({

                    id:
                        Date.now().toString(),

                    categoryId:
                        pendingSession.categoryId,

                    seconds:
                        pendingSession.seconds,

                    date:
                        pendingSession.date,

                    createdAt:
                        Date.now()

                });


                saveJSON(
                    "focusflowSessions",
                    sessions
                );


                pendingSession =
                    null;


                resetTimer();


                closeModal(
                    "saveSessionModal"
                );


                renderCalendar();
                renderDayStats();
                renderStatistics();
                renderWeeklyChart();
                updateProgress();

            }
        );


    /* =====================================================
       CANCEL SESSION
    ===================================================== */

    document
        .getElementById(
            "cancelSessionBtn"
        )
        .addEventListener(
            "click",
            () => {

                pendingSession =
                    null;


                resetTimer();


                closeModal(
                    "saveSessionModal"
                );

            }
        );


    /* =====================================================
       STATISTICS
    ===================================================== */

    function getCategorySeconds(
        categoryId,
        date = null
    ) {

        return sessions
            .filter(session => {

                const sameCategory =
                    session.categoryId ===
                    categoryId;


                const sameDate =
                    date === null ||
                    session.date === date;


                return (
                    sameCategory &&
                    sameDate
                );

            })
            .reduce(
                (sum, session) =>
                    sum +
                    Number(
                        session.seconds || 0
                    ),
                0
            );

    }


    function getTotalSeconds(
        date = null
    ) {

        return sessions
            .filter(session => {

                return (
                    date === null ||
                    session.date === date
                );

            })
            .reduce(
                (sum, session) =>
                    sum +
                    Number(
                        session.seconds || 0
                    ),
                0
            );

    }


    function renderStatistics() {

        const container =
            document.getElementById(
                "statisticsList"
            );


        container.innerHTML = "";


        if (categories.length === 0) {

            container.innerHTML = `
                <div class="empty-small">
                    ${t("noCategories")}
                </div>
            `;

            return;

        }


        const values =
            categories.map(
                category => ({

                    category,

                    seconds:
                        getCategorySeconds(
                            category.id
                        )

                })
            );


        const maxSeconds =
            Math.max(
                ...values.map(
                    item =>
                        item.seconds
                ),
                1
            );


        values.forEach(item => {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "stat-row";


            const percentage =
                Math.min(
                    100,
                    item.seconds /
                    maxSeconds *
                    100
                );


            row.innerHTML = `

                <div class="stat-icon">
                    ${escapeHTML(
                        item.category.icon
                    )}
                </div>

                <div class="stat-info">

                    <div class="stat-name">
                        ${escapeHTML(
                            item.category.name
                        )}
                    </div>

                    <div class="stat-bar">

                        <div
                            class="stat-bar-fill"
                            style="width:${percentage}%"
                        ></div>

                    </div>

                </div>

                <div class="stat-time">
                    ${formatDuration(
                        item.seconds
                    )}
                </div>

            `;


            container.appendChild(
                row
            );

        });

    }


    /* =====================================================
       DAY STATISTICS
    ===================================================== */

    let selectedDate =
        getDateKey(
            new Date()
        );


    function renderDayStats() {

        const container =
            document.getElementById(
                "dayStats"
            );


        container.innerHTML = "";


        const date =
            selectedDate;


        document.getElementById(
            "selectedDateTitle"
        ).textContent =
            formatReadableDate(
                date
            );


        const values =
            categories
                .map(
                    category => ({

                        category,

                        seconds:
                            getCategorySeconds(
                                category.id,
                                date
                            )

                    })
                )
                .filter(
                    item =>
                        item.seconds > 0
                );


        if (values.length === 0) {

            container.innerHTML = `
                <div class="empty-small">
                    ${t("noActivity")}
                </div>
            `;

            return;

        }


        values.forEach(item => {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "day-stat";


            row.innerHTML = `

                <div class="day-stat-icon">
                    ${escapeHTML(
                        item.category.icon
                    )}
                </div>

                <div class="day-stat-info">

                    <div class="day-stat-name">
                        ${escapeHTML(
                            item.category.name
                        )}
                    </div>

                    <div class="day-stat-time">
                        ${formatDuration(
                            item.seconds
                        )}
                    </div>

                </div>

            `;


            container.appendChild(
                row
            );

        });


        const total =
            values.reduce(
                (sum, item) =>
                    sum +
                    item.seconds,
                0
            );


        const totalElement =
            document.createElement(
                "div"
            );


        totalElement.className =
            "day-total";


        totalElement.textContent =
            `${t("total")}: ${formatDuration(
                total
            )}`;


        container.appendChild(
            totalElement
        );

    }


    /* =====================================================
       CALENDAR
    ===================================================== */

    let calendarDate =
        new Date();


    function renderCalendar() {

        const year =
            calendarDate.getFullYear();


        const month =
            calendarDate.getMonth();


        document.getElementById(
            "calendarTitle"
        ).textContent =
            new Intl.DateTimeFormat(
                language === "ru"
                    ? "ru-RU"
                    : "en-US",
                {
                    month: "long",
                    year: "numeric"
                }
            ).format(
                calendarDate
            );


        const grid =
            document.getElementById(
                "calendarGrid"
            );


        grid.innerHTML = "";


        let firstDay =
            new Date(
                year,
                month,
                1
            ).getDay();


        firstDay =
            firstDay === 0
                ? 6
                : firstDay - 1;


        const daysInMonth =
            new Date(
                year,
                month + 1,
                0
            ).getDate();


        for (
            let i = 0;
            i < firstDay;
            i++
        ) {

            const empty =
                document.createElement(
                    "div"
                );


            empty.className =
                "calendar-day empty";


            grid.appendChild(
                empty
            );

        }


        for (
            let day = 1;
            day <= daysInMonth;
            day++
        ) {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "calendar-day";


            button.textContent =
                day;


            const date =
                new Date(
                    year,
                    month,
                    day
                );


            const key =
                getDateKey(
                    date
                );


            const total =
                getTotalSeconds(
                    key
                );


            if (
                total > 0 &&
                total < 3600
            ) {

                button.classList.add(
                    "activity-blue"
                );

            }


            if (
                total >= 3600
            ) {

                button.classList.add(
                    "activity-green"
                );

            }


            if (
                key ===
                getDateKey(
                    new Date()
                )
            ) {

                button.classList.add(
                    "today"
                );

            }


            if (
                key ===
                selectedDate
            ) {

                button.classList.add(
                    "selected"
                );

            }


            button.addEventListener(
                "click",
                () => {

                    selectedDate =
                        key;


                    renderCalendar();

                    renderDayStats();

                    renderTasks();

                }
            );


            grid.appendChild(
                button
            );

        }

    }


    document
        .getElementById(
            "prevMonth"
        )
        .addEventListener(
            "click",
            () => {

                calendarDate.setMonth(
                    calendarDate.getMonth() - 1
                );


                renderCalendar();

            }
        );


    document
        .getElementById(
            "nextMonth"
        )
        .addEventListener(
            "click",
            () => {

                calendarDate.setMonth(
                    calendarDate.getMonth() + 1
                );


                renderCalendar();

            }
        );


    /* =====================================================
       TASKS
    ===================================================== */

    document
        .getElementById(
            "addTaskBtn"
        )
        .addEventListener(
            "click",
            () => {

                document.getElementById(
                    "taskInput"
                ).value = "";


                openModal(
                    "taskModal"
                );


                setTimeout(
                    () => {

                        document
                            .getElementById(
                                "taskInput"
                            )
                            .focus();

                    },
                    100
                );

            }
        );


    document
        .getElementById(
            "saveTaskBtn"
        )
        .addEventListener(
            "click",
            () => {

                const input =
                    document.getElementById(
                        "taskInput"
                    );


                const text =
                    input.value.trim();


                if (!text) {

                    alert(
                        t("enterTask")
                    );

                    return;

                }


                tasks.push({

                    id:
                        Date.now().toString(),

                    text,

                    completed:
                        false,

                    date:
                        selectedDate,

                    createdAt:
                        Date.now()

                });


                saveJSON(
                    "focusflowTasks",
                    tasks
                );


                renderTasks();


                closeModal(
                    "taskModal"
                );

            }
        );


    function renderTasks() {

        const container =
            document.getElementById(
                "tasksList"
            );


        const empty =
            document.getElementById(
                "emptyTasks"
            );


        container.innerHTML = "";


        const selectedTasks =
            tasks.filter(
                task =>
                    task.date ===
                    selectedDate
            );


        empty.style.display =
            selectedTasks.length === 0
                ? "block"
                : "none";


        selectedTasks.forEach(
            task => {

                const row =
                    document.createElement(
                        "div"
                    );


                row.className =
                    "task";


                if (task.completed) {

                    row.classList.add(
                        "done"
                    );

                }


                row.innerHTML = `

                    <input
                        class="task-check"
                        type="checkbox"
                        ${task.completed
                            ? "checked"
                            : ""}
                    >

                    <div class="task-text">
                        ${escapeHTML(
                            task.text
                        )}
                    </div>

                    <button
                        class="delete-task"
                        aria-label="${t("delete")}"
                    >
                        🗑️
                    </button>

                `;


                const checkbox =
                    row.querySelector(
                        ".task-check"
                    );


                checkbox.addEventListener(
                    "change",
                    () => {

                        task.completed =
                            checkbox.checked;


                        saveJSON(
                            "focusflowTasks",
                            tasks
                        );


                        renderTasks();

                    }
                );


                row
                    .querySelector(
                        ".delete-task"
                    )
                    .addEventListener(
                        "click",
                        () => {

                            tasks =
                                tasks.filter(
                                    item =>
                                        item.id !==
                                        task.id
                                );


                            saveJSON(
                                "focusflowTasks",
                                tasks
                            );


                            renderTasks();

                        }
                    );


                container.appendChild(
                    row
                );

            }
        );

    }


    /* =====================================================
       DAILY PROGRESS
    ===================================================== */

    function updateProgress() {

        const today =
            getDateKey(
                new Date()
            );


        const totalSeconds =
            getTotalSeconds(
                today
            );


        const totalMinutes =
            Math.floor(
                totalSeconds / 60
            );


        const targetMinutes =
            180;


        const percentage =
            Math.min(
                100,
                Math.round(
                    totalMinutes /
                    targetMinutes *
                    100
                )
            );


        document.getElementById(
            "dailyProgressPercent"
        ).textContent =
            `${percentage}%`;


        document.getElementById(
            "dailyProgressText"
        ).textContent =
            `${totalMinutes} ${t(
                "minutes"
            )}`;


        const degrees =
            percentage * 3.6;


        const circle =
            document.querySelector(
                ".progress-circle"
            );


        if (circle) {

            circle.style.background =
                `conic-gradient(
                    var(--green) 0deg,
                    var(--green) ${degrees}deg,
                    var(--bg2) ${degrees}deg,
                    var(--bg2) 360deg
                )`;

        }

    }


    /* =====================================================
       WEEKLY CHART
    ===================================================== */

    function renderWeeklyChart() {

        const container =
            document.getElementById(
                "weeklyChart"
            );


        container.innerHTML = "";


        const days = [];


        for (
            let i = 6;
            i >= 0;
            i--
        ) {

            const date =
                new Date();


            date.setDate(
                date.getDate() - i
            );


            days.push(
                date
            );

        }


        const values =
            days.map(
                date =>
                    getTotalSeconds(
                        getDateKey(
                            date
                        )
                    )
            );


        const max =
            Math.max(
                ...values,
                3600
            );


        days.forEach(
            (date, index) => {

                const seconds =
                    values[index];


                const minutes =
                    Math.floor(
                        seconds / 60
                    );


                const height =
                    Math.max(
                        3,
                        seconds /
                        max *
                        140
                    );


                const column =
                    document.createElement(
                        "div"
                    );


                column.className =
                    "chart-column";


                const dateLabel =
                    new Intl.DateTimeFormat(
                        language === "ru"
                            ? "ru-RU"
                            : "en-US",
                        {
                            weekday: "short"
                        }
                    )
                        .format(date)
                        .slice(0, 2);


                column.innerHTML = `

                    <div class="chart-value">
                        ${minutes}
                    </div>

                    <div
                        class="chart-bar"
                        style="height:${height}px"
                    ></div>

                    <div class="chart-label">
                        ${dateLabel}
                    </div>

                `;


                container.appendChild(
                    column
                );

            }
        );

    }


    /* =====================================================
       SETTINGS
    ===================================================== */

    document
        .getElementById(
            "settingsBtn"
        )
        .addEventListener(
            "click",
            () => {

                updateSettingsButtons();


                openModal(
                    "settingsModal"
                );

            }
        );


    document
        .querySelectorAll(
            ".setting-choice[data-language]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    language =
                        button.dataset.language;


                    applyLanguage();

                }
            );

        });


    document
        .getElementById(
            "darkThemeBtn"
        )
        .addEventListener(
            "click",
            () => {

                theme =
                    "dark";


                applyTheme();

            }
        );


    document
        .getElementById(
            "lightThemeBtn"
        )
        .addEventListener(
            "click",
            () => {

                theme =
                    "light";


                applyTheme();

            }
        );


    /* =====================================================
       RESET
    ===================================================== */

    document
        .getElementById(
            "resetDataBtn"
        )
        .addEventListener(
            "click",
            () => {

                if (
                    !confirm(
                        t("confirmReset")
                    )
                ) {

                    return;

                }


                notes = [];

                sessions = [];

                tasks = [];


                saveJSON(
                    "focusflowNotes",
                    notes
                );


                saveJSON(
                    "focusflowSessions",
                    sessions
                );


                saveJSON(
                    "focusflowTasks",
                    tasks
                );


                renderNotes();

                renderCalendar();

                renderDayStats();

                renderTasks();

                renderStatistics();

                renderWeeklyChart();

                updateProgress();


                closeModal(
                    "settingsModal"
                );

            }
        );


    /* =====================================================
       HELPERS
    ===================================================== */

    function getDateKey(date) {

        const year =
            date.getFullYear();


        const month =
            String(
                date.getMonth() + 1
            ).padStart(
                2,
                "0"
            );


        const day =
            String(
                date.getDate()
            ).padStart(
                2,
                "0"
            );


        return `${year}-${month}-${day}`;

    }


    function formatDuration(seconds) {

        const totalMinutes =
            Math.floor(
                seconds / 60
            );


        const hours =
            Math.floor(
                totalMinutes / 60
            );


        const minutes =
            totalMinutes % 60;


        if (hours > 0) {

            return language === "ru"

                ? `${hours} ч ${minutes} мин`

                : `${hours}h ${minutes}m`;

        }


        return language === "ru"

            ? `${minutes} мин`

            : `${minutes} min`;

    }


    function formatDate(timestamp) {

        return new Intl.DateTimeFormat(

            language === "ru"
                ? "ru-RU"
                : "en-US",

            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }

        ).format(
            new Date(timestamp)
        );

    }


    function formatReadableDate(key) {

        const date =
            new Date(
                `${key}T12:00:00`
            );


        return new Intl.DateTimeFormat(

            language === "ru"
                ? "ru-RU"
                : "en-US",

            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }

        ).format(date);

    }


    function escapeHTML(value) {

        return String(value)

            .replaceAll(
                "&",
                "&amp;"
            )

            .replaceAll(
                "<",
                "&lt;"
            )

            .replaceAll(
                ">",
                "&gt;"
            )

            .replaceAll(
                '"',
                "&quot;"
            )

            .replaceAll(
                "'",
                "&#039;"
            );

    }


    /* =====================================================
       INITIALIZATION
    ===================================================== */

    applyTheme();

    applyLanguage();

    renderNotes();

    renderCategories();

    renderCalendar();

    renderDayStats();

    renderTasks();

    renderStatistics();

    renderWeeklyChart();

    updateProgress();

});
