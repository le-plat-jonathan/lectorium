<?php

class User {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    // inscription d'un utilisateur
    public function create($email, $password, $firstname, $lastname, $address, $zip_code, $city) {
        $sql = "INSERT INTO user (email, password, firstname, lastname, address, zip_code, city, created_at) VALUES (:email, :password, :firstname, :lastname, :address, :zip_code, :city, NOW())";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':email' => $email,
            ':password' => password_hash($password, PASSWORD_DEFAULT),
            ':firstname' => $firstname,
            ':lastname' => $lastname,
            ':address' => $address,
            ':zip_code' => $zip_code,
            ':city' => $city
        ]);
        return ['message' => 'User created successfully'];
    }

    // récupération des données d'un utilisateur par son id
    public function getById($id) {
        $sql = "SELECT * FROM user WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

     // mise à jour des données d'un utilisateur
    public function update($id, $email, $password, $firstname, $lastname, $address, $zip_code, $city) {
        $sql = "UPDATE user SET email = ?, password = ?, firstname = ?, lastname = ?, address = ?, zip_code = ?, city = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$email, password_hash($password, PASSWORD_DEFAULT), $firstname, $lastname, $address, $zip_code, $city, $id]);
        return ['message' => 'User updated successfully'];
    }

     // suppression d'un compte utilisateur (penser à ajouter le DELETE ON CASCADE dans la base de données)
    public function delete($id) {
        $sql = "DELETE FROM user WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
        return ['message' => 'User deleted successfully'];
    }

    // connexion d'un utilisateur
    public function login($email, $password) {
        $sql = "SELECT id, firstname, lastname, password FROM user WHERE email = :email LIMIT 1";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if (password_verify($password, $row['password'])) {
                return array("id" => $row['id'], "firstname" => $row['firstname'], "lastname" => $row['lastname']);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
?>
