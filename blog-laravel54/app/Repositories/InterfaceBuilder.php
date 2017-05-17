<?php
namespace App\Repositories;

interface InterfaceBuilder {

    function getAll();

    function getDetail($typeof,$slug);

    function create(array $attribute);

    function edit($typeof,$slug,array $attribute);

    function remove($typeof,$slug);

}
