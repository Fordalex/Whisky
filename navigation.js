let body = document.querySelector('body');

let navigation = `
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">W</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="whiskies.html">Whiskies</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="brands.html">Brands</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="distilleries.html">Distilleries</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="countries.html">Countries</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="regions.html">Regions</a>
        </li>
         <li class="nav-item">
          <a class="nav-link" href="bottles.html">Bottles</a>
        </li>
    </div>
  </div>
</nav>
`;

body.innerHTML = navigation + body.innerHTML;
