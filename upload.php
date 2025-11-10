<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "exoticdb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $categorie_id = $_POST['categorie_id'];
    $foto = addslashes(file_get_contents($_FILES['foto']['tmp_name']));

    $sql = "INSERT INTO fotos (foto, categorie_id) VALUES ('$foto', '$categorie_id')";
    if ($conn->query($sql) === TRUE) {
        echo "Foto succesvol geüpload!";
    } else {
        echo "Fout: " . $conn->error;
    }
}
?>

<form method="POST" enctype="multipart/form-data">
    <label>Categorie:</label>
    <select name="categorie_id">
        <option value="1">Crossen</option>
    </select><br><br>
    <input type="file" name="foto" required><br><br>
    <button type="submit">Uploaden</button>
</form>
