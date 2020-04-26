delete from collections
where collection_id = $1;

delete from collection_junction
where collection_junction.collection_id = $1;