package com.buopso.overlay

data class ApiResponse(
    val success: Boolean,
    val message: String,
    val traceId: String,
    val result: List<ResultItem>
)

data class ResultItem(
    val asset: Asset,
    val records: List<Record>
)

data class Asset(
    val id: String,
    val label: String,
    val asset: String,
    val module: String,
    val assetName: String
)

data class Record(
    val id: String,
    val icon: String?,
    val stage: Stage,
    val label: String
)

data class Stage(
    val label: String,
    val id: String,
    val color: String
)
