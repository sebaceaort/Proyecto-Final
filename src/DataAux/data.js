export const data =[{
    "id": "Municipio-San-Isidro",
    "type": "Municipio",
     "name": {"value": "San Isidro" },
       "email": "user@sanisidro.ar",
       "value": [{
               "type":"Eje",
             "name": { "value":"accesibilidad"},
               "value": [{
                   "name": { "value": "accesibilidad" },
                   "type": "SubEje",
                   "value": [{
                       "type": "Indicador",
                       "name": {"value": "Transporte público accesible" },
                       "cantidad": 50,
                       "description": {"value": "Porcentaje de atractivos turisticos que cuentan con acceso por transporte público adaptado en las inmediaciones" },
                       "tipoIndicador": "PORCENTAJE",
                       "meta": {
                           "type": "Meta",
                           "fecha": "2021-11-30",
                           "objetivo": 95
                       }
                   }]
               }]
           },
           {
               "type": "Eje",
               "name": {"value": "Seguridad" },
               "value": [
                   {
                       "type": "SubEje",
                       "name": {"value": "Seguridad Ciudadana" },
                       "value": [
                           {
                               "type": "Indicador",
                               "name": "Delitos contra la persona",
                               "cantidad": 5096,
                               "description": "Número de delitos que atentan contra todas las personas",
                               "tipoIndicador": "NUMERO",
                               "meta": {
                                   "type": "Meta",
                                   "fecha": "2021-11-25",
                                   "objetivo": 3000
                               }
                           }
                       ]
                   }
               ]
           }
       ]
   },
   {
       "id": "Municipio-Olivos",
       "name": {"value": "Olivos" },
       "email": "user@olivos.ar",
       "value": [
           {
               "type": "Eje",
               "name": { "value":"accesibilidad" },
               "value": [
                   {
                       "type":"SubEje",
                       "name": { "value":"accesibilidad" },
                       "value": [
                           {
                               "type": "indicador",
                               "name": { "value":"Transporte público accesible" },
                               "cantidad": 50,
                               "descripcion": "Porcentaje de atractivos turisticos que cuentan con acceso por transporte público adaptado en las inmediaciones",
                               "tipoIndicador": "PORCENTAJE",
                               "meta": {
                                   "type": "Meta",
                                   "fecha": "2021-11-30",
                                   "objetivo": 95
                               }
                           }
                       ]
                   }
               ]
           },
           {
               "type": "SubEje",
               "name": {"value": "Sustentabilidad" },
               "value": [
                   {
                       "type": "SubEje",
                       "name": "Ambiente",
                       "indicadores": [
                           {
                               "id": "108",
                               "name": "Bicisendas y carriles peatonales",
                               "cantidad": 10.6,
                               "descripcion": "Número de kilómetros de bicisendas y carriles peatonales",
                               "tipoIndicador": "NUMERO",
                               "meta": {
                                   "id": "109",
                                   "fecha": "2021-12-25",
                                   "objetivo": 15
                               }
                           },
                           {
                               "id": "110",
                               "name": "Contaminacion del aire",
                               "cantidad": 10.6,
                               "descripcion": "Grado de contaminación en el aire",
                               "tipoIndicador": "INDICE",
                               "meta": {
                                   "id": "111",
                                   "fecha": "2021-12-25",
                                   "objetivo": 9
                               }
                           }
                       ]
                   },
                   {
                       "id": "112",
                       "name": "Social",
                       "indicadores": [
                           {
                               "id": "113",
                               "name": "Empresas turísticas con certificado de responsabilidad social",
                               "cantidad": 20,
                               "descripcion": "Porcentaje de empresas turísticas del DTI con algún certificado en materia de responsabilidad social",
                               "tipoIndicador": "PORCENTAJE",
                               "meta": {
                                   "id": "114",
                                   "fecha": "2021-12-15",
                                   "objetivo": 30
                               }
                           }
                       ]


                   }
               ]


           }
       ]
   }
]