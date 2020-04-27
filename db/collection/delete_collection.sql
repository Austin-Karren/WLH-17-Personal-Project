delete from collection_junction
where collection_id = $1;

delete from collections
where collection_id = $1;
