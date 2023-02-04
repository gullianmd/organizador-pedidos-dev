
//Organizador en posiciones

function pos(){
  <table border="1">
    <tr>
      <th>Posición</th>
      <th>Nombre</th> 
      <th>Codigo</th>
    </tr>
  
    class Position {
      public $rank;
      public $name;
      public $code;

      public function __construct($rank, $name, $code) {
        $this->rank = $rank;
        $this->name = $name;
        $this->points = $code;
      }
    }
  
    $positions = array(
      new Position("1", "Juan", "100"),
      new Position("2", "Pedro", "90"),
      new Position("3", "Marta", "80"),
      new Position("4", "Ana", "70"),
      new Position("5", "Lucas", "60")
    );
  
    foreach ($positions as $position) {
      echo "<tr>";
      echo "<td>" . $position->rank . "</td>";
      echo "<td>" . $position->name . "</td>";
      echo "<td>" . $position->$code . "</td>";
      echo "</tr>";
    }
  
  </table>
}




//Botones al hacer clic para mover elementos

function BotonMover(){
  <button id="upBtn">Subir</button>
  <button id="downBtn">Bajar</button>

  <div>
    var upBtn = document.getElementById("upBtn");
    var downBtn = document.getElementById("downBtn");
  
    upBtn.addEventListener("click", function() {
    // Código para mover elementos hacia arriba
    });
  
    downBtn.addEventListener("click", function() {
    // Código para mover elementos hacia abajo
    });
  </div>
}



//Botones al hacer clic para mover elementos

function BotonPos()
  
  <form action="index.php" method="post">
  <input type="submit" name="upBtn" value="Subir">
  <input type="submit" name="downBtn" value="Bajar">
  </form>

  
  <ol>
    
    $elements = array("Elemento 1", "Elemento 2", "Elemento 3");
  
    if (isset($_POST["upBtn"])) {
    // Código para mover elementos hacia arriba
    }
  
    if (isset($_POST["downBtn"])) {
    // Código para mover elementos hacia abajo
    }
  
    foreach ($elements as $element) {
      echo "<li>" . $element . "</li>";
    }
    
  </ol>

