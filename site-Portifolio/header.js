window.onload = function () {
    var template = `
    <body>
    <div class="container">
        <div class="item1 bg-color-item1">
            <ul class="texto">
                <li>
                    <a href="home.html">Home</a>
                </li>

                <li>
                    <a href="about.html">About</a>
                </li>

                <li>
                    <a href="github.html">Github</a>
                </li>

                <li>
                    <a href="#linkedin">Linkedin</a>
                </li>

                <li>
                    <a href="">Contact</a>
                </li>
            </ul>
        </div>
        <div class="item2"></div>
        <div class="item3"></div>
        <div class="item4"></div>

    </div>
</body>

 `;

    document.getElementById("header").innerHTML = template;
}