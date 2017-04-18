<?php
namespace App\Repositories;

interface InterfaceBuilder {

    public function getAll();

    public function getDetail($typeof,$slug);

    public function create(array $attribute);

    public function edit($typeof,$slug,array $attribute);

    public function remove($typeof,$slug);

}
