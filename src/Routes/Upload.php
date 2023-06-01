<?php
namespace Tualo\Office\ReportImport\Routes;

use Tualo\Office\Basic\TualoApplication as App;
use Tualo\Office\Basic\Route as BasicRoute;
use Tualo\Office\Basic\IRoute;


class Upload implements IRoute{

    public static function register(){

        BasicRoute::add('/reportimport/upload',function($matches){
           
        },[ 'get','post','put' ],true);
        
    }

    
}