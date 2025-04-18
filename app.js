document.addEventListener("DOMContentLoaded", () => {
    const recommendBtn = document.getElementById("recommendBtn");

    recommendBtn.addEventListener("click", async () => {
        const bookInput = document.getElementById("bookInput").value.trim();
        const recommendationsList = document.getElementById("recommendationsList");

        recommendationsList.innerHTML = ""; // Clear previous results

        if (!bookInput) {
            alert("Please enter a book name!");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/recommend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ book_name: bookInput }),
            });

            if (!response.ok) throw new Error("Failed to fetch recommendations");

            const data = await response.json();

            if (!data.recommendations || data.recommendations.length === 0 || data.recommendations[0] === "Book not found") {
                recommendationsList.innerHTML = "<li>No recommendations found.</li>";
                return;
            }

            data.recommendations.forEach(book => {
                const li = document.createElement("li");
                li.textContent = book;
                recommendationsList.appendChild(li);
            });
        } catch (error) {
            console.error("Error fetching recommendations:", error);
            recommendationsList.innerHTML = "<li>Something went wrong. Please try again later.</li>";
        }
    });
});
